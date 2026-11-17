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
const P=id=>PRODUCTS.find(p=>p.id==id),off=p=>Math.round((1-p.price/p.mrp)*100);
