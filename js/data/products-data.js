// slug|name|category|brand|unit|MRP|price|stock|rating|image folder|photo keyword|popularity
const PRODUCTS=`fresh-red-apples|Fresh Red Apples|fruits-veg|Farm Fresh|1 kg|180|144|60|4.6|fruits|apple|95
organic-bananas|Organic Bananas|fruits-veg|Organic India|1 dozen|70|56|50|4.5|fruits|banana|97
black-grapes|Black Grapes|fruits-veg|Farm Fresh|500 g|110|85|30|4.3|fruits|grapes|80
nagpur-oranges|Nagpur Oranges|fruits-veg|Farm Fresh|1 kg|120|96|40|4.4|fruits|oranges|78
pomegranate|Pomegranate|fruits-veg|Farm Fresh|500 g|140|112|25|4.5|fruits|pomegranate|70
fresh-tomatoes|Fresh Tomatoes|fruits-veg|Farm Fresh|1 kg|50|38|80|4.2|vegetables|tomato|92
green-capsicum|Green Capsicum|fruits-veg|Farm Fresh|500 g|60|48|35|4.3|vegetables|capsicum|74
red-onions|Red Onions|fruits-veg|Farm Fresh|1 kg|45|36|90|4.4|vegetables|onion|93
fresh-potatoes|Fresh Potatoes|fruits-veg|Farm Fresh|1 kg|40|32|0|4.3|vegetables|potato|90
fresh-carrots|Fresh Carrots|fruits-veg|Farm Fresh|500 g|40|30|45|4.2|vegetables|carrot|72
fresh-spinach|Fresh Spinach|fruits-veg|Organic India|250 g|30|24|25|4.1|vegetables|spinach|65
fresh-broccoli|Fresh Broccoli|fruits-veg|Farm Fresh|1 piece|70|56|20|4.4|vegetables|broccoli|68
farm-fresh-milk|Farm Fresh Milk|dairy-bakery|Amul|1 L|72|66|100|4.7|dairy|milk|98
amul-butter|Amul Butter|dairy-bakery|Amul|500 g|285|265|50|4.8|dairy|butter|94
fresh-paneer|Fresh Paneer|dairy-bakery|Mother Dairy|200 g|95|80|30|4.5|dairy|paneer|88
set-curd|Set Curd|dairy-bakery|Nandini|400 g|45|40|50|4.4|dairy|yogurt|76
white-eggs|Farm White Eggs|dairy-bakery|Eggoz|12 pcs|110|89|60|4.5|dairy|eggs|91
cheese-slices|Cheese Slices|dairy-bakery|Britannia|200 g|150|132|40|4.4|dairy|cheese|69
brown-bread|Brown Bread|dairy-bakery|Britannia|400 g|55|48|40|4.3|bakery|bread|85
butter-croissants|Butter Croissants|dairy-bakery|Monginis|4 pcs|120|96|20|4.2|bakery|croissant|60
basmati-rice|Basmati Rice|rice-pulses|India Gate|5 kg|950|749|50|4.7|groceries|rice|93
toor-dal|Toor Dal|rice-pulses|Tata Sampann|1 kg|190|159|45|4.5|groceries|lentils|84
moong-dal|Moong Dal|rice-pulses|Tata Sampann|1 kg|170|142|40|4.4|groceries|mungbean|70
chana-dal|Chana Dal|rice-pulses|24 Mantra|1 kg|130|108|35|4.3|groceries|chickpeas|66
whole-wheat-atta|Whole Wheat Atta|atta-grains|Aashirvaad|5 kg|285|239|70|4.7|groceries|flour|96
rolled-oats|Rolled Oats|atta-grains|Quaker|1 kg|220|169|35|4.4|groceries|oats|72
sunflower-oil|Sunflower Oil|oil-ghee|Fortune|1 L|180|149|60|4.4|groceries|sunflower|86
pure-desi-ghee|Pure Desi Ghee|oil-ghee|Amul|1 L|720|629|25|4.8|groceries|ghee|83
olive-oil|Extra Virgin Olive Oil|oil-ghee|Figaro|500 ml|650|499|18|4.5|groceries|olive|60
potato-chips|Potato Chips|snacks-bev|Lay's|150 g|50|40|90|4.3|snacks|chips|89
chocolate-cookies|Chocolate Cookies|snacks-bev|Britannia|300 g|90|72|55|4.4|snacks|cookies|77
roasted-almonds|Roasted Almonds|snacks-bev|Happilo|250 g|340|289|30|4.6|snacks|almonds|82
orange-juice|Orange Juice|snacks-bev|Real|1 L|120|95|45|4.2|beverages|juice|74
assam-tea|Assam Tea|snacks-bev|Tata Tea|500 g|260|219|40|4.5|beverages|tea|79
instant-coffee|Instant Coffee|snacks-bev|Nescafe|200 g|520|449|30|4.6|beverages|coffee|81
garam-masala|Garam Masala|spices|MDH|100 g|85|68|50|4.5|groceries|spices|73
turmeric-powder|Turmeric Powder|spices|Everest|200 g|70|58|60|4.4|groceries|turmeric|71
red-chilli-powder|Red Chilli Powder|spices|Catch|200 g|90|74|50|4.3|groceries|chili|68
frozen-green-peas|Frozen Green Peas|frozen|Safal|500 g|110|85|40|4.2|groceries|peas|66
vanilla-ice-cream|Vanilla Ice Cream|frozen|Amul|700 ml|240|199|30|4.5|snacks|icecream|81
sandal-soap|Sandal Soap|personal-care|Mysore Sandal|4 x 100 g|220|176|50|4.3|groceries|soap|70
herbal-shampoo|Herbal Shampoo|personal-care|Himalaya|340 ml|310|248|35|4.4|groceries|shampoo|72
toothpaste|Toothpaste|personal-care|Colgate|200 g|120|99|60|4.5|groceries|toothpaste|75
dishwash-liquid|Dishwash Liquid|household|Vim|750 ml|185|149|50|4.3|groceries|dishes|69
laundry-detergent|Laundry Detergent|household|Surf Excel|2 kg|420|349|40|4.5|groceries|laundry|76`.split('\n').map((l,i)=>{const[slug,name,cat,brand,unit,mrp,price,stock,rating,folder,kw,pop]=l.split('|');return{id:i+1,slug,name,cat,brand,unit,mrp:+mrp,price:+price,stock:+stock,rating:+rating,folder,kw,pop:+pop,desc:`${name} from ${brand}. Carefully sourced, hygienically packed and delivered fresh to your doorstep at store prices.`}});

// short one-line description shown on product cards
const SHORT={"fresh-red-apples": "Crisp, juicy and naturally sweet. Great for snacking.","organic-bananas": "Naturally ripened, energy-rich and easy to digest.","black-grapes": "Sweet, seedless-style grapes full of antioxidants.","nagpur-oranges": "Tangy-sweet Nagpur oranges, loaded with vitamin C.","pomegranate": "Ruby-red, juicy seeds. Good for juice and salads.","fresh-tomatoes": "Firm, ripe red tomatoes for curries, salads and chutneys.","green-capsicum": "Crunchy green capsicum for stir-fries, pizza and sabzi.","red-onions": "Strong, flavourful onions, the base of every Indian kitchen.","fresh-potatoes": "Clean, all-purpose potatoes for fries, curries and parathas.","fresh-carrots": "Sweet, crunchy carrots. Ideal for halwa, salad and sabzi.","fresh-spinach": "Tender green leaves, rich in iron. Perfect for palak dishes.","fresh-broccoli": "Fresh green florets for soups, salads and stir-fries.","farm-fresh-milk": "Pure, creamy toned milk for tea, coffee and daily use.","amul-butter": "Rich, salted table butter. Spread it or cook with it.","fresh-paneer": "Soft, fresh cottage cheese for tikka, bhurji and curries.","set-curd": "Thick, creamy dahi, set fresh. Great with meals.","white-eggs": "Farm-fresh eggs, a great source of protein.","cheese-slices": "Smooth, melty slices for sandwiches and burgers.","brown-bread": "Soft whole-wheat bread, a healthier breakfast choice.","butter-croissants": "Flaky, buttery croissants, ready to eat.","basmati-rice": "Long-grain, aromatic basmati for biryani and pulao.","toor-dal": "Protein-rich arhar dal for everyday dal and sambar.","moong-dal": "Light, easy-to-digest split moong for dal and khichdi.","chana-dal": "Nutty split chickpeas for dal, vada and sweets.","whole-wheat-atta": "Fine-milled whole wheat atta for soft rotis and phulkas.","rolled-oats": "Wholegrain oats for quick, healthy breakfast bowls.","sunflower-oil": "Light refined oil for everyday frying and cooking.","pure-desi-ghee": "Aromatic, golden ghee for cooking and finishing.","olive-oil": "Cold-pressed extra virgin oil for salads and light cooking.","potato-chips": "Crispy, salted potato chips for tea-time cravings.","chocolate-cookies": "Crunchy cookies with rich chocolate chips.","roasted-almonds": "Lightly roasted, crunchy almonds. A healthy snack.","orange-juice": "Refreshing orange drink, served chilled.","assam-tea": "Strong, malty Assam leaves for a bold cup of chai.","instant-coffee": "Rich, smooth instant coffee, ready in seconds.","garam-masala": "Aromatic spice blend to finish curries and gravies.","turmeric-powder": "Bright haldi powder with a pure, earthy flavour.","red-chilli-powder": "Vibrant, spicy red chilli powder for deep colour and heat.","frozen-green-peas": "Frozen at peak freshness. Ready for pulao and curries.","vanilla-ice-cream": "Creamy classic vanilla ice cream for the whole family.","sandal-soap": "Sandalwood-scented soap for a fresh, soft bath.","herbal-shampoo": "Gentle herbal shampoo for clean, healthy-looking hair.","toothpaste": "Cavity protection with fresh minty breath.","dishwash-liquid": "Tough on grease, gentle on hands. Sparkling utensils.","laundry-detergent": "Powerful stain removal with long-lasting freshness."};
PRODUCTS.forEach(p=>p.short=SHORT[p.slug]||'');
const P=id=>PRODUCTS.find(p=>p.id==id),off=p=>Math.round((1-p.price/p.mrp)*100);
