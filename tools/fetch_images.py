#!/usr/bin/env python3
"""Download one unique REAL photo per product / category / banner from Pexels (free licence)
into assets/images/, exactly where the website looks first.

Usage:   python3 tools/fetch_images.py YOUR_PEXELS_API_KEY
         (free key, 2 min: https://www.pexels.com/api/)

- Safe to re-run: files that already exist are skipped, so you can run it again to fill gaps.
- A failure on one image never stops the rest.
- After it finishes, the site shows these local photos and needs no internet for images."""
import sys, re, json, os, time, urllib.request, urllib.parse, urllib.error

key = sys.argv[1] if len(sys.argv) > 1 else os.environ.get('PEXELS_KEY')
if not key:
    sys.exit(__doc__)

root = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
used, failed = set(), []

# Better search words for items where the plain product name gives wrong photos.
QUERY = {
    'moong-dal': 'moong dal green gram lentils', 'toor-dal': 'toor dal pigeon peas lentils',
    'chana-dal': 'chana dal split chickpeas', 'whole-wheat-atta': 'whole wheat flour bowl',
    'sunflower-oil': 'sunflower oil bottle', 'pure-desi-ghee': 'ghee clarified butter jar',
    'olive-oil': 'olive oil bottle', 'fresh-paneer': 'paneer cubes indian cheese',
    'set-curd': 'curd yogurt bowl', 'white-eggs': 'white eggs carton',
    'cheese-slices': 'cheese slices', 'sandal-soap': 'soap bars', 'herbal-shampoo': 'shampoo bottle',
    'toothpaste': 'toothpaste toothbrush', 'dishwash-liquid': 'dish soap sponge',
    'laundry-detergent': 'laundry detergent', 'instant-coffee': 'coffee powder jar',
    'assam-tea': 'black tea leaves cup', 'garam-masala': 'garam masala spice mix',
    'turmeric-powder': 'turmeric powder', 'red-chilli-powder': 'red chilli powder',
    'frozen-green-peas': 'green peas', 'vanilla-ice-cream': 'vanilla ice cream scoop',
    'potato-chips': 'potato chips bowl', 'chocolate-cookies': 'chocolate cookies',
    'roasted-almonds': 'almonds', 'orange-juice': 'orange juice glass',
    'brown-bread': 'brown bread loaf', 'butter-croissants': 'croissants',
    'amul-butter': 'butter block', 'farm-fresh-milk': 'milk bottle glass',
    'rolled-oats': 'rolled oats bowl', 'basmati-rice': 'basmati rice',
    'nagpur-oranges': 'oranges fruit', 'fresh-red-apples': 'red apples',
    'organic-bananas': 'bananas', 'black-grapes': 'black grapes',
    'green-capsicum': 'green bell pepper', 'red-onions': 'red onions',
}

def fetch(query, dest, size='medium'):
    if os.path.exists(dest):
        return print('skip   ', os.path.relpath(dest, root))
    api = 'https://api.pexels.com/v1/search?' + urllib.parse.urlencode(
        {'query': query, 'per_page': 20, 'orientation': 'landscape'})
    req = urllib.request.Request(api, headers={'Authorization': key, 'User-Agent': 'freshmart-demo'})
    for attempt in range(3):
        try:
            photos = json.load(urllib.request.urlopen(req, timeout=30))['photos']
            pick = next((p for p in photos if p['id'] not in used), None)
            if not pick:
                raise RuntimeError('no unused result')
            os.makedirs(os.path.dirname(dest), exist_ok=True)
            urllib.request.urlretrieve(pick['src'][size], dest)
            used.add(pick['id'])
            print('saved  ', os.path.relpath(dest, root), '<-', query)
            time.sleep(0.4)
            return
        except urllib.error.HTTPError as e:
            if e.code in (401, 403):
                sys.exit('Pexels rejected the API key (HTTP %d). Check the key and retry.' % e.code)
            time.sleep(2 * (attempt + 1))
        except Exception as e:
            err = e
            time.sleep(2 * (attempt + 1))
    failed.append(query)
    print('FAILED ', query)

src = open(os.path.join(root, 'js/data/products-data.js'), encoding='utf-8').read()
for line in re.search(r'`(.*?)`', src, re.S).group(1).split('\n'):
    f = line.split('|')
    fetch(QUERY.get(f[0], f[1] + ' ' + f[10]), f'{root}/assets/images/products/{f[9]}/{f[0]}.jpg')

cat_src = open(os.path.join(root, 'js/data/categories-data.js'), encoding='utf-8').read()
CAT_Q = {'fruits-veg': 'fresh fruits and vegetables', 'dairy-bakery': 'milk cheese bread',
         'rice-pulses': 'rice and lentils', 'atta-grains': 'wheat grains flour',
         'snacks-bev': 'snacks and drinks', 'spices': 'indian spices', 'oil-ghee': 'cooking oil ghee',
         'personal-care': 'personal care products', 'household': 'cleaning supplies',
         'frozen': 'frozen food'}
for cid, kw in re.findall(r"\['([a-z-]+)','[^']+','([a-z]+)'\]", cat_src):
    fetch(CAT_Q.get(cid, kw + ' groceries'), f'{root}/assets/images/categories/{cid}.jpg')

for name, q in [('hero-grocery', 'fresh vegetables basket groceries'),
                ('weekend-saver', 'fresh vegetables market'),
                ('fast-delivery', 'grocery delivery bag')]:
    fetch(q, f'{root}/assets/images/banners/{name}.jpg', 'large')

print('\nDone.', 'Failed: %s (re-run to retry)' % failed if failed else 'All images saved.')
