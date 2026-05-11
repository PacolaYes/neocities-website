const urlParams = new URLSearchParams(window.location.search);

// string .getCharAt for the comparisons !!

var betterThan = null
var xySum = 0
const responses = {
    yes: [
        ["Of Course!", "Yes!", "Duh.", "Affirmative!", "Absolutely!", "Yep.", "Yeah."],
        [
            ["IS better than", "!"],
            ["IS OBVIOUSLY better than"],
            ["IS CLEARLY better than", "!!"],
            ["is SO GOOD that", "stood no chance."]]
    ],
    no: [
        ["No.", "Nuh uh.", "No chance!", "No way!", "Negative.", "Nope.", "Nah."],
        [
            ["IS NOT better than"],
            ["IS OBVIOUSLY WORSE than"],
            ["DIDN'T EVEN TRY to be better than", "!"],
            ["IS SO BAD that", "didn't need to try."]
        ]
    ]
}
var x = urlParams.get("is") || ""
var y = urlParams.get("betterthan") || ""
x = x && x.trim()
y = y && y.trim()

/**
 * 
 * @param {URLSearchParams} params 
 * @returns 
 */
async function getWikipediaData(params) { // modified from https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch :P
  try {
    const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&${params}`);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const result = await response.json();
    return result
  } catch (error) {
    console.error(error.message);
  }
}

async function getRandomWikipediaArticles() {
    /*
    const wikipediaData = await getWikipediaData(new URLSearchParams({
        action: "query",
        list: "random",
        rnnamespace: "0",
        rnlimit: "2",
        origin: "*"
    }))

    return wikipediaData["query"]["random"]
    */

    const randomArticles = [{"id":1270285,"ns":0,"title":"Nguyen Huy Dau"},{"id":32170570,"ns":0,"title":"American Journal of Medical Quality"},{"id":22774435,"ns":0,"title":"David Beech"},{"id":43367701,"ns":0,"title":"Jefferson Cup"},{"id":13392910,"ns":0,"title":"The Squaw Man (1931 film)"},{"id":22260474,"ns":0,"title":"W\u00e1lter Flores (footballer)"},{"id":44968289,"ns":0,"title":"Hippopsicon rugicolle"},{"id":68573268,"ns":0,"title":"Northolt siege"},{"id":63651732,"ns":0,"title":"Humanitix"},{"id":54477344,"ns":0,"title":"Nzamba Kitonga"},{"id":73934873,"ns":0,"title":"Decorative painting in H\u00e4lsingland"},{"id":882495,"ns":0,"title":"The Conference of the Birds"},{"id":43374750,"ns":0,"title":"Chronological summary of the 2014 Commonwealth Games"},{"id":2385741,"ns":0,"title":"Vernazza"},{"id":20122072,"ns":0,"title":"The Bumblebee Flies Anyway (novel)"},{"id":49414746,"ns":0,"title":"Tom\u00e1s Lipov\u0161ek Puches"},{"id":25558346,"ns":0,"title":"Milton Brand\u00e3o"},{"id":12491672,"ns":0,"title":"Jim Bernstein"},{"id":25468360,"ns":0,"title":"Apuarema"},{"id":33185561,"ns":0,"title":"A\u00e7ma, Gerger"},{"id":77288156,"ns":0,"title":"Nabil Shukri"},{"id":30039303,"ns":0,"title":"Miracle Girl"},{"id":45087628,"ns":0,"title":"List of teams and cyclists in the 1909 Tour de France"},{"id":81365169,"ns":0,"title":"Isabel II (disambiguation)"},{"id":59860213,"ns":0,"title":"Valle Grande Department"},{"id":4982490,"ns":0,"title":"Survivor South Africa: Panama"},{"id":60066950,"ns":0,"title":"CoRoT-18b"},{"id":1319561,"ns":0,"title":"Prop\u00e6dia"},{"id":3034130,"ns":0,"title":"Tattler (bird)"},{"id":2791553,"ns":0,"title":"WILL (AM)"},{"id":12763935,"ns":0,"title":"Allen End"},{"id":52412172,"ns":0,"title":"Laura Trott"},{"id":36352777,"ns":0,"title":"List of ports and harbours in Scotland"},{"id":15936118,"ns":0,"title":"Les Clouzeaux"},{"id":5433334,"ns":0,"title":"Fundamental rights in India"},{"id":52848984,"ns":0,"title":"List of timeshare companies"},{"id":6079780,"ns":0,"title":"Slipping Stitches"},{"id":77450955,"ns":0,"title":"Pi\u0161ra d-Ainia"},{"id":37443166,"ns":0,"title":"Johnny Moates"},{"id":15533814,"ns":0,"title":"Judo at the 2000 Summer Olympics \u2013 Men's 90 kg"},{"id":61705689,"ns":0,"title":"Sven-Olof Israelsson"},{"id":6263016,"ns":0,"title":"Curtis Ebbesmeyer"},{"id":80194234,"ns":0,"title":"1932 in Albanian football"},{"id":8404579,"ns":0,"title":"Shlomo Pines"},{"id":79441813,"ns":0,"title":"2025 European 10 m Events Championships"},{"id":39110312,"ns":0,"title":"Remplacement"},{"id":274782,"ns":0,"title":"Mallt-y-Nos"},{"id":40655598,"ns":0,"title":"Fatin Youssef Bundagji"},{"id":48427940,"ns":0,"title":"Robert Lethbridge (politician)"},{"id":58027815,"ns":0,"title":"Rana Ali Abbas Khan"},{"id":61874800,"ns":0,"title":"Democratic Conservative Party (Syria)"},{"id":6098386,"ns":0,"title":"DMX discography"},{"id":53295398,"ns":0,"title":"Guinea-Bissau men's national under-16 basketball team"},{"id":58130369,"ns":0,"title":"The Safety Match"},{"id":52498026,"ns":0,"title":"Ethan Siegel"},{"id":41579782,"ns":0,"title":"Vaidotas \u0160il\u0117nas"},{"id":52540276,"ns":0,"title":"Prairie Creek (Platte River tributary)"},{"id":25007123,"ns":0,"title":"Bob Johnson (Arkansas state senator)"},{"id":2401420,"ns":0,"title":"Canadian Centennial Medal"},{"id":47436025,"ns":0,"title":"Dervent Heights"},{"id":29871002,"ns":0,"title":"Acrocercops sauropis"},{"id":56012547,"ns":0,"title":"Raoni Barcelos"},{"id":27593610,"ns":0,"title":"Kortney Clemons"},{"id":63629429,"ns":0,"title":"Catharine Mans Bosio"},{"id":67366353,"ns":0,"title":"Vladimir Maslovskiy"},{"id":64939709,"ns":0,"title":"Let's Be Closer Together"},{"id":23908032,"ns":0,"title":"R\u00f3nald Gonz\u00e1lez"},{"id":9934367,"ns":0,"title":"\u017dale"},{"id":3630230,"ns":0,"title":"Stay Lucky"},{"id":19408206,"ns":0,"title":"D\u00f6hne"},{"id":24029360,"ns":0,"title":"C22H29NO3"},{"id":33268494,"ns":0,"title":"Pere Caselles i Tarrats"},{"id":21363875,"ns":0,"title":"Murzynowo, Lubusz Voivodeship"},{"id":12342130,"ns":0,"title":"Tostedt (Samtgemeinde)"},{"id":82126055,"ns":0,"title":"Carlos Carrillo Nalda"},{"id":68875470,"ns":0,"title":"Pim van Strien"},{"id":55990361,"ns":0,"title":"Izatullah Safi"},{"id":18473598,"ns":0,"title":"Nowy Bidacz\u00f3w"},{"id":7088165,"ns":0,"title":"Greek cruiser Navarchos Miaoulis"},{"id":57665137,"ns":0,"title":"Deopahar"},{"id":81853953,"ns":0,"title":"List of awards and nominations received by Park Chan-wook"},{"id":58082713,"ns":0,"title":"H\u00e9lo\u00efse Durant Rose"},{"id":9963765,"ns":0,"title":"RCFC"},{"id":68000986,"ns":0,"title":"Let's Get Crazy (album)"},{"id":613088,"ns":0,"title":"Sankranti"},{"id":13332406,"ns":0,"title":"Lodovico Leoni"},{"id":32394498,"ns":0,"title":"Costas Papacostas"},{"id":5942173,"ns":0,"title":"Hilda Neihardt"},{"id":18974590,"ns":0,"title":"Gorza\u0142\u00f3w"},{"id":319632,"ns":0,"title":"Verisign"},{"id":12744326,"ns":0,"title":"Russell Middlemiss"},{"id":46532623,"ns":0,"title":"CCSS (disambiguation)"},{"id":32649606,"ns":0,"title":"Burchula"},{"id":38814873,"ns":0,"title":"HMS Labuan"},{"id":68056185,"ns":0,"title":"Matteo Polisi"},{"id":2036573,"ns":0,"title":"Bulgarian Wikipedia"},{"id":54988696,"ns":0,"title":"Georgia Zouganeli"},{"id":79949533,"ns":0,"title":"United States Coast Guard Beach Patrol"},{"id":5270003,"ns":0,"title":"Sacar (charity)"},{"id":22688699,"ns":0,"title":"Alexis Chiv\u00e1s"},{"id":74383024,"ns":0,"title":"Line 1 (Madurai Metro)"},{"id":28885006,"ns":0,"title":"Paula Niukula"},{"id":50973727,"ns":0,"title":"Time and Glass"},{"id":67226778,"ns":0,"title":"Fried-Hardy Worm"},{"id":27486651,"ns":0,"title":"Eleveneleven"},{"id":4375085,"ns":0,"title":"USS Coolbaugh"},{"id":62866383,"ns":0,"title":"Munmorah Conglomerate"},{"id":33761379,"ns":0,"title":"Spiez Castle"},{"id":7335149,"ns":0,"title":"Amazon milk frog"},{"id":58893091,"ns":0,"title":"Heberth Gonz\u00e1lez"},{"id":58014478,"ns":0,"title":"The Priory, Gladesville"},{"id":1773974,"ns":0,"title":"Arthur Seligman"},{"id":44046685,"ns":0,"title":"Stephen Kerley"},{"id":80279911,"ns":0,"title":"Lerato Ngobeni"},{"id":4575022,"ns":0,"title":"Gunduli\u0107 family"},{"id":70245979,"ns":0,"title":"QuayCity Q3"},{"id":25017634,"ns":0,"title":"Lamar Soutter"},{"id":622174,"ns":0,"title":"HMS Sceptre (1802)"},{"id":21085493,"ns":0,"title":"Natalya Isakova"},{"id":196242,"ns":0,"title":"Averroism"},{"id":12624603,"ns":0,"title":"Tamanka siitensis"},{"id":32719839,"ns":0,"title":"1987 Clemson Tigers football team"},{"id":821939,"ns":0,"title":".22 long rifle"},{"id":54724187,"ns":0,"title":"Bartolomeo III Arese"},{"id":72813096,"ns":0,"title":"James K. O'Connor"},{"id":44465765,"ns":0,"title":"Chiba Jets"},{"id":58867275,"ns":0,"title":"Sulthan Bathery Orthodox Diocese"},{"id":62014284,"ns":0,"title":"Remni"},{"id":74482004,"ns":0,"title":"Adagio (2023 film)"},{"id":633353,"ns":0,"title":"Sick's Stadium"},{"id":61862348,"ns":0,"title":"Manic World Tour"},{"id":2291042,"ns":0,"title":"Missouri Route 101"},{"id":26816801,"ns":0,"title":"Lookout (architecture)"},{"id":56312879,"ns":0,"title":"Khurram Abbas Sial"},{"id":19340775,"ns":0,"title":"List of Fringe episodes"},{"id":66692433,"ns":0,"title":"Ken Meyir Kunfah"},{"id":81324417,"ns":0,"title":"Vytautas Augustinas"},{"id":68291456,"ns":0,"title":"Oreonectes duanensis"},{"id":53005230,"ns":0,"title":"Egesina fujiwarai"},{"id":54070209,"ns":0,"title":"Geir Kvernmo"},{"id":11422463,"ns":0,"title":"Mike McBain"},{"id":39075322,"ns":0,"title":"1832 United States presidential election in Alabama"},{"id":765225,"ns":0,"title":"Spaghetti House siege"},{"id":15297472,"ns":0,"title":"William Wright (footballer, born 1893)"},{"id":2010582,"ns":0,"title":"Christopher Drexler"},{"id":20179527,"ns":0,"title":"Albert Prowse"},{"id":41207058,"ns":0,"title":"Donald Cameron Hamilton"},{"id":26581759,"ns":0,"title":"Bun an Churraigh"},{"id":219865,"ns":0,"title":"Actinomycetota"},{"id":56312431,"ns":0,"title":"Farrukh Javed"},{"id":38357142,"ns":0,"title":"Wrestling at the 2010 Asian Games \u2013 Men's freestyle 120 kg"},{"id":903679,"ns":0,"title":"USS Jones (1814)"},{"id":24993891,"ns":0,"title":"The Party Album"},{"id":286282,"ns":0,"title":"Seveso disaster"},{"id":18883882,"ns":0,"title":"Chris Provenzano"},{"id":64453290,"ns":0,"title":"Andrena nothocalaidis"},{"id":49073593,"ns":0,"title":"Aina Karlsone"},{"id":54486254,"ns":0,"title":"Luis Perea (footballer, born 1997)"},{"id":54523079,"ns":0,"title":"David Annwn Jones"},{"id":2925554,"ns":0,"title":"Jack Afamasaga"},{"id":11389518,"ns":0,"title":"List of number-one singles in Australia during the 1960s"},{"id":1829797,"ns":0,"title":"Dover and Deal"},{"id":41529468,"ns":0,"title":"Les Graphiquants"},{"id":29330582,"ns":0,"title":"John Simpson (fencer)"},{"id":74630033,"ns":0,"title":"2023\u201324 Iranian Futsal Super League"},{"id":123286,"ns":0,"title":"Milo, Missouri"},{"id":339345,"ns":0,"title":"Zyzzyva"},{"id":39859815,"ns":0,"title":"June 2013 Egyptian protests"},{"id":57611752,"ns":0,"title":"Jae'Sean Tate"},{"id":15288624,"ns":0,"title":"Ana Fern\u00e1ndez (volleyball)"},{"id":7804005,"ns":0,"title":"Guyra Shire"},{"id":19856637,"ns":0,"title":"Par\u00f3wki"},{"id":627969,"ns":0,"title":"Metoidioplasty"},{"id":63484311,"ns":0,"title":"Llwynypia Hospital"},{"id":72493054,"ns":0,"title":"Samsung Galaxy M04"},{"id":15718612,"ns":0,"title":"Pr\u00e9lude, Choral et Fugue (Franck)"},{"id":48088216,"ns":0,"title":"Mehmet \u00c7ak\u0131r Cultural and Sports Center"},{"id":3600059,"ns":0,"title":"Starter for 10 (film)"},{"id":47342082,"ns":0,"title":"Till the End (album)"},{"id":40244548,"ns":0,"title":"HMCS Edmundston"},{"id":77777956,"ns":0,"title":"Portrait of Harriet Mellon"},{"id":67617804,"ns":0,"title":"1887 St Leonards colonial by-election"},{"id":2997838,"ns":0,"title":"Joseph Williamson"},{"id":39739772,"ns":0,"title":"2013 CONCACAF Gold Cup squads"},{"id":12476932,"ns":0,"title":"Bennhausen"},{"id":7383366,"ns":0,"title":"Porta Coeli"},{"id":22265540,"ns":0,"title":"Kilmallock (Parliament of Ireland constituency)"},{"id":38623380,"ns":0,"title":"Bhetaguri"},{"id":5426007,"ns":0,"title":"Department of Communications, Information Technology and the Arts"},{"id":26887921,"ns":0,"title":"Merrygoen"},{"id":294787,"ns":0,"title":"Diego Mart\u00ednez Barrio"},{"id":7854621,"ns":0,"title":"Surf Life Saving Australia"},{"id":82705678,"ns":0,"title":"James Mwangi Gakuya"},{"id":2291800,"ns":0,"title":"Good Neighbor Sam"},{"id":21973893,"ns":0,"title":"Cardiospermum"},{"id":23571838,"ns":0,"title":"P\u0159ehvozd\u00ed"},{"id":19787573,"ns":0,"title":"Ask Me How I Am"},{"id":31657436,"ns":0,"title":"Digital Kitchen"},{"id":3512094,"ns":0,"title":"Dave Pinkney Trophy"},{"id":81949308,"ns":0,"title":"Lautaro Recabarren"},{"id":12612675,"ns":0,"title":"Cyprichromis leptosoma"},{"id":49338530,"ns":0,"title":"2016 Rio Open \u2013 Men's singles"},{"id":55625846,"ns":0,"title":"Macrosoma leptosiata"},{"id":2894874,"ns":0,"title":"Ochsner Baptist Medical Center"},{"id":60074976,"ns":0,"title":"Robert Goldberg"},{"id":28018393,"ns":0,"title":"Mai Chao"},{"id":46771376,"ns":0,"title":"List of number-one club tracks of 2002 (Australia)"},{"id":5108937,"ns":0,"title":"Heteroclinic cycle"},{"id":77151173,"ns":0,"title":"The Monuments Men (soundtrack)"},{"id":49578871,"ns":0,"title":"Sophronica binigromaculipennis"},{"id":72216980,"ns":0,"title":"Mariano Vargas"},{"id":56077717,"ns":0,"title":"Mexico at the 2017 Summer Deaflympics"},{"id":3306338,"ns":0,"title":"El Portal"},{"id":57302352,"ns":0,"title":"Spensa Technologies"},{"id":10050767,"ns":0,"title":"Corn lily"},{"id":51360659,"ns":0,"title":"Juan Carlos de La Cuesta"},{"id":47667435,"ns":0,"title":"Montserrat men's national basketball team"},{"id":18094953,"ns":0,"title":"Kao Ching-yuen"},{"id":50157280,"ns":0,"title":"Svyatoslav Gabuda"},{"id":42145310,"ns":0,"title":"Philodromus bosmansi"},{"id":19016011,"ns":0,"title":"Sotigui Kouyat\u00e9"},{"id":65361378,"ns":0,"title":"Hayato Imai"},{"id":53708327,"ns":0,"title":"Jean Poueigh"},{"id":72263211,"ns":0,"title":"2023 Montreal Alouettes season"},{"id":54379480,"ns":0,"title":"Fiskburg, Kentucky"},{"id":1225932,"ns":0,"title":"Te Papa"},{"id":35925549,"ns":0,"title":"Deh Sheykh, South Khorasan"},{"id":18900589,"ns":0,"title":"1994\u201395 Iraqi National League"},{"id":64963843,"ns":0,"title":"Joshua 2"},{"id":25541407,"ns":0,"title":"Sz\u00e1szfa"},{"id":28224791,"ns":0,"title":"Rachel Rosing"},{"id":43122520,"ns":0,"title":"Coremia signaticollis"},{"id":161505,"ns":0,"title":"Maurice Ashley"},{"id":31351345,"ns":0,"title":"Philipp Maintz"},{"id":21582201,"ns":0,"title":"Werner Kaiser"},{"id":69431470,"ns":0,"title":"Sunil Kumar (born 1960)"},{"id":26476438,"ns":0,"title":"List of Community characters"},{"id":5891560,"ns":0,"title":"Bom\u00ea County"},{"id":9857722,"ns":0,"title":"Peloponnese (region)"},{"id":1014433,"ns":0,"title":"Chondroitin"},{"id":3707145,"ns":0,"title":"Unreachable memory"},{"id":20608308,"ns":0,"title":"Roelof Kranenburg"},{"id":12666625,"ns":0,"title":"Euglandina wani"},{"id":45718921,"ns":0,"title":"Diego Rodr\u00edguez (goalkeeper)"},{"id":1560940,"ns":0,"title":"Anton Seidl"},{"id":49383679,"ns":0,"title":"Global Chinese Music Awards"},{"id":82147537,"ns":0,"title":"Garret Frey"},{"id":52465170,"ns":0,"title":"Marie Ahlers"},{"id":68861503,"ns":0,"title":"Phan Thong railway station"},{"id":24176890,"ns":0,"title":"William Jones (canoeist)"},{"id":73183546,"ns":0,"title":"Meteorological history of Cyclone Freddy"},{"id":8681217,"ns":0,"title":"Joe Kidd"},{"id":76529561,"ns":0,"title":"Nur Banu \u00d6zpak"},{"id":74987672,"ns":0,"title":"Wrestling at the 2022 Asian Games \u2013 Men's Greco-Roman 97 kg"},{"id":50754805,"ns":0,"title":"1999\u20132000 FC Porto season"},{"id":931,"ns":0,"title":"The Amazing Spider-Man"},{"id":66435163,"ns":0,"title":"Do\u011faca, \u00c7an"},{"id":57659545,"ns":0,"title":"John Strete"},{"id":43670108,"ns":0,"title":"Dessaline, Haiti"},{"id":4771849,"ns":0,"title":"Vine City station"},{"id":53159408,"ns":0,"title":"Asaphodes albalineata"},{"id":73506034,"ns":0,"title":"1907\u201308 Belfast Charity Cup"},{"id":36911948,"ns":0,"title":"Cycling at the 2012 Summer Paralympics \u2013 Women's 500 m time trial C1\u20133"},{"id":1649422,"ns":0,"title":"Jay and Silent Bob's Secret Stash"},{"id":9034087,"ns":0,"title":"Verbmobil"},{"id":18940490,"ns":0,"title":"2010 Winter Olympics medal table"},{"id":52070167,"ns":0,"title":"Abdul-Rab al-Shadadi"},{"id":54460049,"ns":0,"title":"Boondandilla, Queensland"},{"id":61667946,"ns":0,"title":"George Acosta"},{"id":74292297,"ns":0,"title":"Bayerische Hypotheken- und Wechsel-Bank"},{"id":20530038,"ns":0,"title":"South Australia Asset Management Corp v York Montague Ltd"},{"id":40236327,"ns":0,"title":"York Plateau"},{"id":8328424,"ns":0,"title":"41xx steel"},{"id":41177200,"ns":0,"title":"Bob Bird (footballer)"},{"id":34938103,"ns":0,"title":"Gilles Dreyfus"},{"id":80717571,"ns":0,"title":"Monastyrsky (surname)"},{"id":39655418,"ns":0,"title":"Romanian Academy of Sciences"},{"id":24413853,"ns":0,"title":"John Sandon"},{"id":61566553,"ns":0,"title":"British swimming champions \u2013 200 metres medley winners"},{"id":5551628,"ns":0,"title":"Quw'utsun Secondary School"},{"id":39409479,"ns":0,"title":"Sa\u0161a Jovanovi\u0107 (footballer, born 1993)"},{"id":10829101,"ns":0,"title":"P. K. Banerjee (diplomat)"},{"id":10473668,"ns":0,"title":"J\u00fcrgen May"},{"id":62799381,"ns":0,"title":"Tiririt"},{"id":58543590,"ns":0,"title":"Karola Schustereder"},{"id":20219736,"ns":0,"title":"1975 France rugby union tour of South Africa"},{"id":23649567,"ns":0,"title":"Chelyabinsk State University"},{"id":2684505,"ns":0,"title":"Joe Morris (American football)"},{"id":57107568,"ns":0,"title":"Macaria sulphurea"},{"id":5113379,"ns":0,"title":"Abd al-Hamid Kishk"},{"id":300213,"ns":0,"title":"Napier Deltic"},{"id":3537025,"ns":0,"title":"Maidu language"},{"id":878702,"ns":0,"title":"Yamanobe, Yamagata"},{"id":9139015,"ns":0,"title":"Guisclafred of Carcassonne"},{"id":58412161,"ns":0,"title":"Malloea"},{"id":21261999,"ns":0,"title":"Praszczyki"},{"id":24939350,"ns":0,"title":"William Joseph Condon"},{"id":3762051,"ns":0,"title":"Clarence Cannon"},{"id":77502307,"ns":0,"title":"Dimitrij Schaad"},{"id":61862142,"ns":0,"title":"Filter Bunker Raigmore Inverness"},{"id":9275529,"ns":0,"title":"Julio Iglesias (footballer)"},{"id":5442499,"ns":0,"title":"John Uro\u0161"},{"id":28710952,"ns":0,"title":"Sikanderpur metro station"},{"id":10265669,"ns":0,"title":"Aurinia saxatilis"},{"id":69867980,"ns":0,"title":"Sphoeroides angusticeps"},{"id":65723082,"ns":0,"title":"Daire Connery"},{"id":69137769,"ns":0,"title":"Rep\u00fablica (restaurant)"},{"id":674818,"ns":0,"title":"Royal Palace of Amsterdam"},{"id":54124147,"ns":0,"title":"Bobby Dale Earnhardt"},{"id":74660173,"ns":0,"title":"Kamianets-Podilskyi urban hromada"},{"id":75742466,"ns":0,"title":"John William Hotson"},{"id":76102266,"ns":0,"title":"Jess (album)"},{"id":103286,"ns":0,"title":"Fitzroy Island National Park"},{"id":42148975,"ns":0,"title":"Michael MacWhite"},{"id":56730922,"ns":0,"title":"Logos-Sarx-Christology"},{"id":43795941,"ns":0,"title":"Bhatt Harbans"},{"id":68097748,"ns":0,"title":"2021\u201322 Adelaide United FC season"},{"id":52694995,"ns":0,"title":"Bannaella"},{"id":17811878,"ns":0,"title":"Italian invasion of Egypt"},{"id":82418526,"ns":0,"title":"Fanny Thibout"},{"id":61053341,"ns":0,"title":"Susannah Hunnewell"},{"id":34749161,"ns":0,"title":"84th Airlift Flight"},{"id":79918927,"ns":0,"title":"Whately (surname)"},{"id":2016388,"ns":0,"title":"Strong Ukraine"},{"id":16993417,"ns":0,"title":"Ripple Mill, Ringwould"},{"id":46360198,"ns":0,"title":"\u00c7orluspor"},{"id":57216031,"ns":0,"title":"Women in the Persian Constitutional Revolution"},{"id":21258721,"ns":0,"title":"Adolphe Colrat"},{"id":45338653,"ns":0,"title":"Sibpur S.S.P.S Vidyalaya"},{"id":5495341,"ns":0,"title":"Guy Woolfenden"},{"id":4710107,"ns":0,"title":"Baqashot"},{"id":70720276,"ns":0,"title":"Lou Bastien"},{"id":34149792,"ns":0,"title":"Diana Gould"},{"id":82721235,"ns":0,"title":"Jayson Kent"},{"id":15606692,"ns":0,"title":"Ruffey-le-Ch\u00e2teau"},{"id":28274374,"ns":0,"title":"Tiger Island (Dreamworld)"},{"id":73432518,"ns":0,"title":"Tales from the Rift"},{"id":41435515,"ns":0,"title":"Carlo Guillermo Proto"},{"id":31185,"ns":0,"title":"Tonne"},{"id":15413518,"ns":0,"title":"Grand-Rozoy"},{"id":72227297,"ns":0,"title":"2022 Faroese general election"},{"id":9907758,"ns":0,"title":"Bevahites"},{"id":41241215,"ns":0,"title":"Second Yemenite War"},{"id":27286591,"ns":0,"title":"List of ship launches in 1850"},{"id":66810929,"ns":0,"title":"Aiello (singer)"},{"id":65257092,"ns":0,"title":"Adele Woodhouse Erb Sullivan"},{"id":27043414,"ns":0,"title":"Republic of China in the Vietnam War"},{"id":34741003,"ns":0,"title":"Harald L\u00f8bak Thoresen"},{"id":76367615,"ns":0,"title":"First European congress of astronomers"},{"id":62811506,"ns":0,"title":"JaMicheal Morgan"},{"id":24883712,"ns":0,"title":"Ese Odo"},{"id":10939863,"ns":0,"title":"Liv Racing TeqFind"},{"id":54843114,"ns":0,"title":"F\u00e1tima Diame"},{"id":30852382,"ns":0,"title":"Tomi Hirvonen"},{"id":48797293,"ns":0,"title":"Novomessor albisetosus"},{"id":64369423,"ns":0,"title":"John Driscoll (sailor)"},{"id":38927121,"ns":0,"title":"Shahaat"},{"id":25406204,"ns":0,"title":"Deckenia (crab)"},{"id":49004775,"ns":0,"title":"Tahir Dizdari"},{"id":41864662,"ns":0,"title":"Jef Gilson"},{"id":33008746,"ns":0,"title":"Patinoire olympique de Pralognan-la-Vanoise"},{"id":43234107,"ns":0,"title":"Morpheis discreta"},{"id":16073283,"ns":0,"title":"Conrad Schmitt"},{"id":29582856,"ns":0,"title":"Tvib\u00e5sen Valley"},{"id":860351,"ns":0,"title":"Passamaquoddy Bay"},{"id":27672655,"ns":0,"title":"William Owen Stanley"},{"id":40487592,"ns":0,"title":"Ipatovo (inhabited locality)"},{"id":55307624,"ns":0,"title":"Fernand Tovondray"},{"id":5926192,"ns":0,"title":"Council of Orange"},{"id":6975128,"ns":0,"title":"Llangwm"},{"id":82687887,"ns":0,"title":"Eastern Polesian dialect"},{"id":69738319,"ns":0,"title":"Pristimantis gretathunbergae"},{"id":1962355,"ns":0,"title":"Edith Woodford-Grimes"},{"id":56630127,"ns":0,"title":"Richie Koh"},{"id":64803488,"ns":0,"title":"Karbala-class landing ship"},{"id":4413245,"ns":0,"title":"Compton Bay"},{"id":74619235,"ns":0,"title":"Boreomysis"},{"id":80474165,"ns":0,"title":"N-Desethylprotonitazene"},{"id":77441676,"ns":0,"title":"2002\u201303 Minnesota Golden Gophers women's ice hockey season"},{"id":33279052,"ns":0,"title":"Endless (Inna song)"},{"id":12449225,"ns":0,"title":"Glynn Saulters"},{"id":32275025,"ns":0,"title":"Pittsburgh Wallabies"},{"id":50630452,"ns":0,"title":"List of erotic thriller films"},{"id":24168695,"ns":0,"title":"2007\u201308 Welsh League Cup"},{"id":2249702,"ns":0,"title":"Strangefolk"},{"id":495598,"ns":0,"title":"Blade element theory"},{"id":49551478,"ns":0,"title":"Charlie Conord"},{"id":24514752,"ns":0,"title":"List of Israeli attacks on Gaza in 2009"},{"id":13959274,"ns":0,"title":"Feng Qinzai"},{"id":390163,"ns":0,"title":"Keihin\u2013T\u014dhoku Line"},{"id":65721676,"ns":0,"title":"Eva Hasell"},{"id":48942432,"ns":0,"title":"Sex in Public (TV series)"},{"id":49806911,"ns":0,"title":"Akudo Sabi"},{"id":34032077,"ns":0,"title":"Paul Ta\u00e7on"},{"id":75762840,"ns":0,"title":"GT World Challenge America (Circuit of the Americas)"},{"id":40654246,"ns":0,"title":"Port of Noshiro"},{"id":45114331,"ns":0,"title":"Nowell-Mayerburg-Oliver House"},{"id":11971460,"ns":0,"title":"Foreign relations of Abkhazia"},{"id":7810315,"ns":0,"title":"Eparchy of Sagar"},{"id":54074226,"ns":0,"title":"Canton of Val-de-Saire"},{"id":42347615,"ns":0,"title":"Timalus clavipennis"},{"id":60975159,"ns":0,"title":"Agust\u00edn Izquierdo"},{"id":67057235,"ns":0,"title":"Green human resource management"},{"id":4826904,"ns":0,"title":"FK Zemun"},{"id":78633456,"ns":0,"title":"V\u00edctor Calatayud"},{"id":30483223,"ns":0,"title":"British NVC community OV15"},{"id":32039612,"ns":0,"title":"Fiua"},{"id":79144385,"ns":0,"title":"Limnoscansor"},{"id":36127893,"ns":0,"title":"Okulovka"},{"id":7397979,"ns":0,"title":"Joseph Plaskett"},{"id":5438626,"ns":0,"title":"Inferior hemorrhoidal"},{"id":14157656,"ns":0,"title":"Grevillea microstegia"},{"id":9537544,"ns":0,"title":"1987 IAAF World Cross Country Championships"},{"id":58370686,"ns":0,"title":"Pengiran Muda Mahkota Pengiran Muda Haji Al-Muhtadee Billah Hospital"},{"id":70299557,"ns":0,"title":"HMS Sylph (1916)"},{"id":67584069,"ns":0,"title":"Phineas M. Casady"},{"id":8018520,"ns":0,"title":"Allotopic expression"},{"id":555751,"ns":0,"title":"Iams"},{"id":40504268,"ns":0,"title":"MC21-A"},{"id":48255302,"ns":0,"title":"Leo Connors"},{"id":33343108,"ns":0,"title":"Brenton (disambiguation)"},{"id":8936815,"ns":0,"title":"Francisco de Alvarado"},{"id":19916366,"ns":0,"title":"Lipiny, Gmina Zbuczyn"},{"id":51017966,"ns":0,"title":"Bethesda University"},{"id":2743042,"ns":0,"title":"Illinois Terminal"},{"id":40968957,"ns":0,"title":"Legionella maceachernii"},{"id":56616777,"ns":0,"title":"Cratena minor"},{"id":160353,"ns":0,"title":"First World"},{"id":11536346,"ns":0,"title":"Almerigo Grilz"},{"id":6902870,"ns":0,"title":"The Love Album (Westlife album)"},{"id":70935347,"ns":0,"title":"Fruits Basket: Prelude"},{"id":22378204,"ns":0,"title":"1991 FINA Men's Water Polo World Cup"},{"id":43912424,"ns":0,"title":"Gomgush"},{"id":51745130,"ns":0,"title":"Al-Aabbassiyah"},{"id":48973429,"ns":0,"title":"Arthur McMahon (sport shooter)"},{"id":15699852,"ns":0,"title":"Diocese of Leiria\u2013F\u00e1tima"},{"id":78400898,"ns":0,"title":"Kamila Beregszasziova"},{"id":59499487,"ns":0,"title":"Skellington 3"},{"id":2603563,"ns":0,"title":"Association of Volleyball Professionals"},{"id":55296585,"ns":0,"title":"Andri R\u00fanar Bjarnason"},{"id":30642720,"ns":0,"title":"Astley Green Colliery"},{"id":56478991,"ns":0,"title":"Miatta Fahnbulleh"},{"id":18761891,"ns":0,"title":"Po\u00e9ssi"},{"id":52860668,"ns":0,"title":"Fornieles"},{"id":48609055,"ns":0,"title":"Jos\u00e9 Leclerc"},{"id":79814550,"ns":0,"title":"Brush-by diplomacy"},{"id":60289416,"ns":0,"title":"One More Mem'ry"},{"id":69629574,"ns":0,"title":"Line S1 (Taizhou Rail Transit)"},{"id":12281,"ns":0,"title":"Gottfried Wilhelm Leibniz"},{"id":6973028,"ns":0,"title":"Graceful catshark"},{"id":66255599,"ns":0,"title":"Adrian Wong Tsz-ching"},{"id":61930848,"ns":0,"title":"David Smith (rugby union, born 1957)"},{"id":21600395,"ns":0,"title":"Howard Yates"},{"id":24714731,"ns":0,"title":"Lawrence O'Brien Furlong"},{"id":8611584,"ns":0,"title":"Massachusetts Board of Education"},{"id":64327207,"ns":0,"title":"Mediterranean Cup (men's football)"},{"id":54025516,"ns":0,"title":"Canton of Charleville-M\u00e9zi\u00e8res-1"},{"id":68200711,"ns":0,"title":"Attorney General Foster"},{"id":14848106,"ns":0,"title":"Shilpa Saklani"},{"id":63010613,"ns":0,"title":"Yang Xin"},{"id":42654813,"ns":0,"title":"Sonja Vermeylen"},{"id":2283088,"ns":0,"title":"July 31 (Eastern Orthodox liturgics)"},{"id":43143630,"ns":0,"title":"Kempsville Formation"},{"id":25800576,"ns":0,"title":"Tebe-Tebe"},{"id":75319457,"ns":0,"title":"Subhasish Bhowmik"},{"id":41157058,"ns":0,"title":"Swimming at the 1999 Pan American Games \u2013 Women's 4 \u00d7 100 metre freestyle relay"},{"id":1496283,"ns":0,"title":"New Bomb Turks"},{"id":70988564,"ns":0,"title":"2022 Malaysia Masters"},{"id":79451696,"ns":0,"title":"Taki Bluesinger"},{"id":2581018,"ns":0,"title":"Oakville, New South Wales"},{"id":78014288,"ns":0,"title":"Reginald Knight"},{"id":4894320,"ns":0,"title":"Kathleen Heddle"},{"id":38154664,"ns":0,"title":"Benzil reductase"},{"id":75596013,"ns":0,"title":"David Mamutovic"},{"id":5450597,"ns":0,"title":"Matthew 12:23"},{"id":71206371,"ns":0,"title":"Geology of North York Moors National Park"},{"id":20977566,"ns":0,"title":"James A. Sharp Jr."},{"id":66753644,"ns":0,"title":"Noccaea alpestris"},{"id":51237142,"ns":0,"title":"Silica sulfuric acid"},{"id":82499161,"ns":0,"title":"Tanyproctoides gormicus"},{"id":44605816,"ns":0,"title":"Standard BC Li\u00e8ge"},{"id":34324059,"ns":0,"title":"Paparao School"},{"id":53373847,"ns":0,"title":"Good Lovin' (Benjamin Ingrosso song)"},{"id":7084977,"ns":0,"title":"Tatra 613"},{"id":4013294,"ns":0,"title":"Perth Burghs (UK Parliament constituency)"},{"id":11537666,"ns":0,"title":"Negarchy"},{"id":70658074,"ns":0,"title":"Pseudocoremia fascialata"},{"id":31056801,"ns":0,"title":"Tortyra argentifascia"},{"id":72122817,"ns":0,"title":"Henry Hunter (actor)"},{"id":41776063,"ns":0,"title":"Lycomorpha grotei"},{"id":64119342,"ns":0,"title":"Milton Locks"},{"id":9768238,"ns":0,"title":"Talamadugu"},{"id":3770747,"ns":0,"title":"Cantons of the Orne department"},{"id":507987,"ns":0,"title":"Mohammad-Javad Bahonar"},{"id":12948304,"ns":0,"title":"Society for the Promotion of New Music"},{"id":447490,"ns":0,"title":"Dennis Miller Live"},{"id":44946071,"ns":0,"title":"The Clever Mrs. Carfax"},{"id":7223955,"ns":0,"title":"Hudson Terminal"},{"id":60104284,"ns":0,"title":"2019 VMI Keydets football team"},{"id":15811246,"ns":0,"title":"Fontenay-sur-Loing"}]
    let art1 = Math.trunc(Math.random() * randomArticles.length)
    let art2 = art1
    while (art2 == art1) {
        art2 = Math.trunc(Math.random() * randomArticles.length)
    }

    return [randomArticles[art1], randomArticles[art2]]
}

async function getWikipediaImage(search) {
    /*try {
        let pageResult = await getWikipediaData(new URLSearchParams({
            action: "query",
            list: "search",
            srnamespace: "0",
            srsearch: search,
            srlimit: "max",
            format: "json",
            origin: "*"
        }))

        let pagesInfo = pageResult["query"]["search"]

        if (pagesInfo.length <= 0) { return }

        for (i = 0; i < pagesInfo.length; i++) {
            let pageInfo = pagesInfo[i]
            //action=query&titles=Mario&prop=pageprops&format=json
            let propsResult = await getWikipediaData(new URLSearchParams({
                action: 'query',
                titles: pageInfo["title"],
                prop: 'pageprops',
                format: 'json',
                origin: "*"
            }))
            
            let propsInfo = propsResult["query"]["pages"][pageInfo["pageid"]]["pageprops"]

            let imageResult = await getWikipediaData(new URLSearchParams({
                action: "query",
                titles: `File:${(propsInfo["page_image"] || propsInfo["page_image_free"])}`,
                prop: "imageinfo",
                iiprop: "url",
                format: "json",
                origin: "*"
            }))

            let imageInfo = imageResult["query"]["pages"]

            for (const key in imageInfo) {
                let value = imageInfo[key]
                if (value["imageinfo"] && value["imageinfo"][0]["url"]) {
                    return value["imageinfo"][0]["url"]
                }
            }
        }
    } catch (error) {
        console.error(error.message)
    }*/

    return "/assets/img/imgnotfound.png"
}

function handleComparison() {
    if (x) {
        const titleX = document.getElementById("titleX")
        const inputX = document.getElementById("inputX")
        const descX = document.getElementById("betterthan-Xdesc")

        titleX.innerText = x
        inputX.value = x
        descX.innerText = x
    }

    if (y) {
        const titleY = document.getElementById("titleY")
        const inputY = document.getElementById("inputY")
        const descY = document.getElementById("betterthan-Ydesc")

        titleY.innerText = y
        inputY.value = y
        descY.innerText = y
    }
    
    if (x && y) {
        // https://ao.bloat.cat/questions/94037/convert-character-to-ascii-code-in-javascript#30887763
        // (insert og stack overflow thingie here)
        let coolX = x.toLowerCase().trim()
        let coolY = y.toLowerCase().trim()
        let xSum = coolX.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        let ySum = coolY.split('').map(char => char.charCodeAt(0)).reduce((current, previous) => previous + current)
        console.log(xSum)
        console.log(ySum)
        xySum = xSum - ySum
        if (xySum < 0) {
            xySum = -xySum + 1
        }
        console.log(xySum)

        if (xSum == ySum) {
            betterThan = "same"
        } else {
            if (xySum % 2 == 0) {
                betterThan = true
            } else {
                betterThan = false
            }
        }
    }
    document.title = `is ${x || "(X)"} better than ${y || "(Y)"}?`
}

var loadingNum = 0
function handleLoading() {
    const loading = document.getElementById("betterthan-loading")
    loading.innerText = "Computing" + ".".repeat(loadingNum)

    if (loadingNum++ >= 3) {
        loadingNum = 0
    }
}

async function betterthan_onLoad() {
    handleComparison()

    if (betterThan != null) {
        const loading = document.getElementById("betterthan-loading")
        loading.style.display = null

        handleLoading()
        var loadingID = setInterval(handleLoading, 1000)
    }

    const inputX = document.getElementById("inputX")
    const inputY = document.getElementById("inputY")

    const placeholders = await getRandomWikipediaArticles()

    inputX.placeholder = placeholders[0]["title"]
    inputY.placeholder = placeholders[1]["title"]

    if (betterThan == null) { return }

    let imgXURL = await getWikipediaImage(x)
    let imgX = document.getElementById("betterthan-Ximg")
    imgX.src = imgXURL
    
    let imgYURL = await getWikipediaImage(y)
    let imgY = document.getElementById("betterthan-Yimg")
    imgY.src = imgYURL

    // artificial loading baybee
    setTimeout(() => {
        const result1 = document.getElementById("betterthan-result")
        const result2 = document.getElementById("betterthan-resultp2")
        const result3 = document.getElementById("betterthan-resultp3")
        let response
        switch (betterThan) {
            case true:
                response = responses["yes"]

                result1.innerText = response[0][Math.trunc(Math.random() * response[0].length)]
                result2.innerText = response[1][xySum % response[1].length][0]
                result3.innerText = response[1][xySum % response[1].length][1]
                break
            case false:
                response = responses["no"]

                result1.innerText = response[0][Math.trunc(Math.random() * response[0].length)]
                result2.innerText = response[1][xySum % response[1].length][0]
                result3.innerText = response[1][xySum % response[1].length][1]
                break
            case "same":
                result1.innerText = "Of course not, as"
                result2.innerText = "is the same as"
                result3.innerText = "undefined"
                break
        }

        if (result3.innerText && result3.innerText != "undefined") {
            result3.style.display = null
        }

        const resultDiv = document.getElementById("betterthan-resultDiv")
        resultDiv.style.display = null

        const loading = document.getElementById("betterthan-loading")
        loading.style.display = "none"
        
        window.clearInterval(loadingID)
    }, 4000)
}

document.addEventListener("DOMContentLoaded", betterthan_onLoad, false);