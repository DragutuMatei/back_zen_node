import { collection, getDocs, orderBy } from "firebase/firestore";
import { db } from "../../config_fire.js";

const infos = {
  meditatii: {
    title: "Info Meditatii",
    content: `<p style="fontWeight:600" > In ritmul stresant al vietii cotidiene, practica meditatiei devine din ce in ce mai populara pe masura ce incearcam sa descoperim noi moduri de a ne relaxa, de a ne detasa de griji si stres, de a evolua in plan spiritual sau personal, ori de a ne imbunatati calitatea vietii.
</p>
<br/>
<br/>


<b style="fontWeight:800" >Ce este meditatia si vizualizarea ghidata?</b>
<br/>

<p style="fontWeight:600" >
Meditatia si vizualizarea ghidata reprezinta o tehnica blanda, dar puternica si eficienta, de redirectionare a atentiei si a mintii asupra unor simturi, emotii sau imagini mentale, in moduri proactive si pozitive. Te poti elibera astfel mult mai usor de ganduri, tensiuni sau anxietate, reusind sa accesezi resurse interioare nebanuite.
Vocea si instructiunile mele au rolul de a te ajuta in procesul de relaxare, detasare mentala sau eliberare emotionala, sustinandu-te pas cu pas pe tot parcursul calatoriei tale interioare.
</p>
<br/>
<br/>


<b style="fontWeight:800" >Care sunt efectele acestei practici?</b>
<br/>

</p>
<br/>
<br/>


<p style="fontWeight:600" >
Atunci cand starea de meditatie se combina cu muzica de relaxare, puterea gandurilor si a imaginatiei, ajungi sa ai parte de experiente vii si profunde, vei explora mai bine interiorul fiintei tale si vei descoperi noi dimensiuni ale libertatii, inspiratiei, echilibrului si fericirii.
</p>
<br/>


<p style="fontWeight:600" >

Acest tip de terapie minte-corp te va purta prin toate frecventele undelor cerebrale (starea beta, alpha, theta, delta) si poate stimula toate cele 5 simturi, (auz, vaz, miros, gust, simt tactil), implicand corpul fizic dar si trairile si senzatiile, de aici rezultand efectul de detoxifiere mentala si emotionala al acestei practici.
</p>
<br/>


<p style="fontWeight:600" >

Datorita structurilor creierului pe care le implica, meditatia ghidata deblocheaza emotiile, amplifica si sustine starea de bine, sensibilitatea la muzica, deschiderea catre spiritualitate, intuitie, gandire abstracta si empatie. Pentru ca mobilizeaza subconstientul in a sprijini gandurile si obiectivele constiente, ea creste puterea interioara si motivatia de a actiona pentru indeplinirea dorintelor si visurilor tale.
</p>
<br/>
<br/>


<b style="fontWeight:800" >Meditatia ghidata nu este doar o tehnica usoara si accesibila de relaxare si de reducere a anxietatii, dar reprezinta o unealta importanta in dezvoltarea personala.</b>
<br/>


<p style="fontWeight:600" >

In ultimii 40 de ani, oamenii de stiinta au studiat beneficiile meditatiei si vizualizarii ghidate, demonstrand impactul pozitiv pe care il au asupra sanatatii mentale si fizice, creativitatii si performantei. In urma acestor studii, astazi putem afirma ca cel putin 10 minute de meditatie sau vizualizare ghidata pe zi, iti pot imbunatati viata pe mai multe planuri.
</p>
<br/>
<br/>


<b style="fontWeight:800" >Beneficii psihologice</b>
<br/>


<ul>
<li>imbunatateste memoria;</li>
<br/>

<li>dezvolta creativitatea;</li>
<br/>

<li>imbunatateste abilitatea de “a gandi limpede”;</li>
<br/>

<li>imbunatateste capacitatea de a lua cele mai bune decizii in solutionarea problemelor;</li>
<br/>

<li>ajuta la eliminarea tiparelor negative si a dependentelor nocive;</li>
<br/>

<li>reduce starea de nervozitate si starile emotionale oscilante;</li>
<br/>

<li>combate depresia si anxietatea;</li>
<br/>

</ul>

<b style="fontWeight:800" >Beneficii fizice</b>
<br/>


<ul>
<li>reduce tensiunea musculara;</li>
<br/>

<li>imbunatateste sistemul imunitar;</li>
<br/>

<li>accelereaza capacitatea de vindecare fizica;</li>
<br/>

<li>scade presiunea arteriala;</li>
<br/>

<li>scade nivelul colesterolului si al glucozei din sange;</li>
<br/>

<li>reduce riscul de aparitie a bolilor cardiovasculare;</li>
<br/>

<li>combate insomnia si te ajuta sa te odihnesti mai bine;</li>
<br/>

<li>imbunatateste fluxul de aer din plamani si de aici rezulta o mai buna oxigenare a organismului;</li>
<br/>

<li>reduce nivelul hormonilor de stres;</li>
<br/>

<li>creste sentimentul de vitalitate si revigorare;</li>
<br/>

<li>ajuta in procesul de echilibrare al corpului fizic;</li>
<br/>

<li>reduce stresul post-traumatic;</li>
<br/>

</ul>

<b style="fontWeight:800" >Beneficii emotionale</b>
<br/>


<ul>
<li>incurajeaza si dezvolta gandirea pozitiva;</li>
<br/>

<li>creste nivelul de incredere in sine;</li>
<br/>

<li>creste deschiderea de a primi si oferi iubire;</li>
<br/>

<li>combate atacurile de panica;</li>
<br/>

<li>incurajeaza deschiderea sufleteasca fata de cei din jur;</li>
<br/>

<li>ajuta la eliberarea emotiilor negative;</li>
<br/>

</ul>

<b style="fontWeight:800" >Beneficii spirituale</b>
<br/>


<ul>
<li>castigi un sentiment de scop si sens in aceasta viata;</li>
<br/>

<li>te simti mai conectat cu Universul interior dar si cu cei din jurul tau;</li>
<br/>

<li>esti mai deschis spre iubire, acceptare si compasiune;</li>
<br/>

<li>iti imbunatateste intuitia;</li>
<br/>

<li>te ajuta sa te conectezi mai mult cu momentul prezent;</li>
<br/>

</ul>`,
  },
  respira: {
    title: "Info Respira",
    content: `<p style="fontWeight:600" >
     Ce ai spune daca ti-ai lua cateva minute de pauza pentru a te concentra asupra respiratiei? Ti-am pregatit cateva exercitii simple care te pot ajuta sa te relaxezi, eliberand treptat stresul si tensiunea cotidiana.
</p>
<br/>
<br/>



<b style="fontWeight:800" >Respiratia este cea mai importanta functie a organismului si conditioneaza in mod complex intreaga activitate a fiintei tale.</b>
<br/>

<p style="fontWeight:600" >
Tehnicile de respiratie sunt fundamentale atunci cand vorbim despre inducerea starii de calm si reducerea anxietatii, pentru ca activeaza sistemul parasimpatic, cel care este responsabil pentru senzatia de relaxare, odihna si digestie.
</p>
<br/>


<p style="fontWeight:600" >

Poti sa-ti schimbi starea de spirit in mod constient, ajungand de la stres, anxietate sau furie, la starea de calm si relaxare. Este nevoie doar sa modifici modul si ritmul in care respiri. 
</p>
<br/>
<br/>


<b style="fontWeight:800" >De ce este important sa respiri abdominal?</b>
<br/>

<p style="fontWeight:600" >
Respiratia abdominala reprezinta modul natural si eficient in care poti respira pentru a pastra un echilibru intre corpul, mintea si emotiile tale.
</p>
<br/>


<p style="fontWeight:600" >

De cele mai multe ori uitam ca respiratia implica participarea a numerosi muschi, printre care diafragma, un muschi situat sub plamani, care poate solicita abdomenul. In acest fel, poti intelege mai bine de ce este esential si mai ales benefic sa inveti sa respiri cu ajutorul abdomenului.
</p>
<br/>


<p style="fontWeight:600" >

Intr-o stare relaxata, abdomenul se dilata cand inspiri, deoarece plamanii se extind in jos. In schimb, in stare de stres, diafragma ramane fixa, impiedicand plamanii sa coboare. Rezultatul: respiratia este in acest caz toracica si incompleta, ducand in timp la cresterea presiunii arteriale, favorizand afectiunile cardiovasculare, anxietatea si depresia.
</p>
<br/>


<p style="fontWeight:600" >

Nu poti evita intotdeauna sursele de stres din viata ta, dar poti dezvolta noi moduri de a face fata unor astfel de momente. Unul dintre aceste moduri este respiratia abdominala ritmica, prin care poti aduce in armonie sistemul circulator, respirator si digestiv.
</p>
<br/>


<p style="fontWeight:600" >

Acest tip de respiratie incurajeaza schimbul complet dintre oxigen si dioxid de carbon.
Respiratia abdominala ritmica ajuta la eliberarea toxinelor, imbunatateste sistemul imunitar si te ajuta sa ajungi la acea stare de calm si relaxare profunda.
</p>
<br/>
<br/>

 

<b style="fontWeight:800" >De ce este important ritmul respiratiei?</b>
<br/>

<p style="fontWeight:600" >
Incetinind sau accelerand in mod constient respiratia, vei dispune de un mijloc eficient si sigur care iti va permine sa modifici gradat modul de functionare al organismului.
</p>
<br/>


<p style="fontWeight:600" >

Practicand regulat aceste exercitii de respiratie, cate 10 minute dimineata si seara, vei incepe sa observi efecte benefice asupra vitalitatii si a starii tale mentale si emotionale.
</p>
<br/>
<br/>



<b style="fontWeight:800" >Cele 8 tehnici de respiratie pe care le-am pregatit au urmatoarele beneficii:</b>
<br/>


<ul>
<li>Sunt eficiente in prevenirea si eliberarea stresului, anxietatii si a insomniilor;</li>
<br/>

<li>Ajuta la dezvoltarea capacitatii de concentrare;</li>
<br/>

<li>Ajuta la scaderea si stabilizarea presiunii arteriale;</li>
<br/>

<li>Ajuta la detoxifierea organismului si eliberarea toxinelor;</li>
<br/>

<li>Ajuta, sustin si imbunatatesc sanatatea sistemului respirator;</li>
<br/>

<li>Elibereaza tensiunile de la nivelul diafragmei si al muschilor intercostali;</li>
<br/>

<li>Calmeaza sistemul nervos;</li>
<br/>

<li>Imbunatatesc sistemul imunitar;</li>
<br/>

<li>Ajuta mintea sa se relaxeze, sporind astfel capacitatea de a invata, de a te focusa sau de a memora;</li>
<br/>

<li>Ajuta la imbunatatirea sistemului cardiovascular;</li>
<br/>

<li>Ajuta la functionarea imbunatatita a sistemului de eliminare a rezidurilor organice;</li>
<br/>

<li>Ajuta la eliberarea indirecta a emotiilor negative si a conceptiilor limitative;</li>
<br/>

</ul>`,
  },
  mesaje: {
    title: "Info Mesaje",
    content: `
    <p style="fontWeight:600" >
    Ti-am pregatit peste 50 de carduri cu citate si interpretarea lor, pentru dezvoltarea intuitiei si inspiratia ta zilnica.
</p>
<br/>
<br/>


<p style="fontWeight:600" >

M-am gandit ca este mai bine sa alegi chiar tu mesajul care sa te ghideze in fiecare zi, decat sa o fac eu pentru tine. Astfel, vei avea ocazia sa te conectezi si mai mult cu intuitia ta, folosindu-te de puterea intentiei si Legea Atractiei.
</p>
<br/>



<b style="fontWeight:800" >Cum functioneaza Legea Atractiei atunci cand alegi un mesaj?</b>
<br/>


<p style="fontWeight:600" >

Suma tuturor gandurilor si actiunilor tale emite o anumita vibratie, pe care Universul o primeste si careia iti raspunde in consecinta prin situatii, persoane, conjuncturi sau sincronicitati.
</p>
<br/>


<p style="fontWeight:600" >

Prin urmare, ceea ce vibrezi vei atrage in viata ta. La fel se intampla si atunci cand alegi un mesaj. Vei atrage intotdeauna cardul care contine mesajul ce rezoneaza cel mai bine cu subconstientul si vibratia ta din acel moment. Astfel, ai puterea de a-ti slefui viata prin intentie, vointa, emotii si ganduri. 
</p>
<br/>


<p style="fontWeight:600" >

Lasa-te ghidat de intuitia ta inainte sa alegi un mesaj. Tot ce trebuie sa faci, este sa urmezi acesti pasi simpli:
</p>
<br/>


<ul>
<li>Acorda-ti un moment pentru a-ti linisti mintea, inainte de a alege un mesaj;</li>
<br/>

<li>Conecteaza-te cu interiorul tau si detaseaza-te de toate asteptarile pe care le ai in acest moment;</li>
<br/>

<li>Pastreaza in gand intentia ca vei primi exact mesajul de care ai nevoie in momentul prezent;</li>
<br/>

<li>Cand citesti mesajul ales, observa gandurile, emotiile sau ideile care apar, pentru ca ele te vor ajuta sa intelegi mai bine cum se oglindeste acest mesaj in viata ta, sau intr-o situatie din viata ta;</li>
<br/>

<li>Tine cont de interpretarea mesajului si permite acestuia sa te ghideze;</li>
<br/>

</ul>`,
  },
  asculta: {
    title: "Info Asculta",
    content: `<b style="fontWeight:800" >Calatorii audio 3D cu sunetele din natura</b>
<br/>

<p style="fontWeight:600" >
Visezi sa ai parte de noi experiente care sa te poarte spre starea de relaxare si pace interioara? Iti doresti sa calatoresti prin intermediul simturilor tale in cele mai exotice si fantastice locuri din natura? 
</p>
<br/>
<br/>



<b style="fontWeight:800" >Prin noile tehnici audio 3D, visurile pot deveni mai reale decat iti imaginezi.</b>
<br/>


<p style="fontWeight:600" >

Esti la un pas distanta de a te bucura de o selectie unica de sunete 3D din natura si muzica de relaxare. Aceasta tehnologie iti va transmite o frecventa binaurala specifica, pentru a te ajuta sa te relaxezi si sa te conectezi mai bine cu intuitia ta.
</p>
<br/>
<br/>



<b style="fontWeight:800" >Asculta natura</b>
<br/>


<p style="fontWeight:600" >

A petrece timp in natura iti poate aduce beneficii mentale, spirituale sau fizice, in moduri variate si surprinzatoare. 
</p>
<br/>


<p style="fontWeight:600" >

Timpul petrecut in natura duce la cresterea vitalitatii si a starii de relaxare, dar si la imbunatatirea functiilor cognitive si la dezvoltarea creativitatii. Te vei simti mai conectat atunci cand esti in armonie cu natura si de aici rezulta senzatia de calm si impamantare.
</p>
<br/>


<p style="fontWeight:600" >

A petrece macar cateva minute in natura, fizic sau mental, iti poate schimba starea de spirit prin acel sentiment minunat de uimire in fata unei paduri inverzite, a unui cer plin de stele sau rasarit de soare. 
</p>
<br/>


<p style="fontWeight:600" >

Stiu ca nu poti ajunge in mijlocul naturii ori de cate ori iti doresti, dar prin intermediul acestor calatorii audio, ai oportunitatea de a experimenta sentimentul de conexiune cu tot ceea ce te inconjoara. 
</p>
<br/>
<br/>


<b style="fontWeight:800" >In spatele pleoapelor inchise, tehnologia va transforma sunetele 3D intr-un Univers viu si fascinant.</b>
<br/>


<p style="fontWeight:600" >
Intuitia iti va ghida subconstientul catre locuri pline de semnificatie. Nu trebuie decat sa respiri, sa inchizi ochii si sa te lasi purtat intr-o calatorie a sunetelor si a senzatiilor de tot felul.  Vom incepe cu 5-10 minute de relaxare ghidata care te vor introduce in tema meditatiei si te vor ajuta sa depasesti granitele mintii constiente, pasind dincolo portile imaginatiei tale.
</p>
<br/>


<p style="fontWeight:600" >

Apoi, vei ramane in compania muzicii si a naturii, in acest Univers personal in care simturile se trezesc la viata si unde stii ca totul este posibil.
</p>
<br/>


<p style="fontWeight:600" >

Tonurile binaurale vor rezona la unison cu frecventele undelor cerebrale si te vor conduce spre o relaxare profunda, traversand pe rand starea beta, alpha, theta si delta.
</p>
<br/>


<p style="fontWeight:600" >

Sunetele naturii prelucrate prin tehnologia 3D vor crea senzatii cat mai autentice si te vor transpune intr-o lume fascinanta, departe de freamatul vietii cotidiene, acolo unde te poti relaxa in voie. Te vei conecta astfel mai bine cu intuitia ta si vei gasi, usor, raspuns la toate intrebarile care iti macina viata. 
</p>
<br/>
<br/>




<h1><b style="fontWeight:800" >Vindecare prin vibratie si sunete</b>
<br/>
</h1>
<br/>
<br/>

<p>
Frecventele sacre ale solfegiului reprezinta tonuri si sunete specifice care ajuta la restabilirea armoniei dintre minte, corp si spirit. Aceste frecvente se regasesc in istoria crestinismului, cantate de calugarii Georgieni, dar si in mantrele antice sanscrite.
</p>
<br/>


<p style="fontWeight:600" >

Tonalitatile muzicii creeaza vibratii care influenteaza mintea subconstienta, promovand cresterea energiei vitale si vindecarea fizica si emotionala.
</p>
<br/>


<p style="fontWeight:600" >

<b style="fontWeight:800" >Care sunt frecventele sacre</b>
<br/>


<ul>
<li><b style="fontWeight:800" >396 Hz – elibereaza frica si vinovatia</b>
<br/>
</li>
<br/>

</ul>


<p style="fontWeight:600" >
Echilibreaza chakra radacina (Muladhara) oferindu-ti sentimentul de impamantare si te ajuta sa eliberezi frica, vinovatia si anxietatea din mintea constienta si subconstienta, transformand suferinta in bucurie.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >417 Hz – elimina negativitatea si blocajele</b>
<br/>
</li>
<br/>

</ul>


<p style="fontWeight:600" >
Echilibreaza chakra sacrala (Swadhisthana), elimina convingerile negative, traumele si blocajele emotionale, si te ajuta sa faci schimbari benefice in viata ta.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >432 Hz – calmeaza mintea si spiritul</b>
<br/>
</li>
<br/>

</ul>


<p style="fontWeight:600" >
Calmeaza mintea si spiritul oferindu-ti sentimentul de pace si echilibru interior.
</p>
<br/>


<ul>
<li><b style="fontWeight:800" >528 Hz – aduce transformare si miracole</b>
<br/>
</li>
<br/>

</ul>


<p style="fontWeight:600" >
Echilibreaza chakra plexului solar (Manipura) si ajuta la vindecarea energetica a corpului. Aduce transformarea si miracolele in viata ta reparand AND-ul, reduce nivelul hormonilor de stres din corp si creste nivelul energie, incredere si stima de sine.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >639 Hz – imbunatateste relatiile si comunicarea</b>
<br/>
</li>
<br/>

</ul>

<p style="fontWeight:600" >

Echilibreza chakra inimii (Anahata), imbunatateste relatiile, comunicarea si conexiunile spirituale, incurajand iubirea, toleranta si compasiunea.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >741 Hz – elimina toxinele si radiatiile</b>
<br/>
</li>
<br/>

</ul>

<p style="fontWeight:600" >

Echilibreaza chakra gatului (Vishuddha), curata celulele corpului de toxine si de radiatiile electromagnetice, te ajuta sa te exprimi autentic si sa gasesti solutii problemelor cu care te confrunti, promovand o viata sanatoasa si echilibrata.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >852 Hz – trezeste intuitia</b>
<br/>
</li>
<br/>

</ul>

<p style="fontWeight:600" >

Echilibreaza chakra celui de-al treilea ochi (Ajna), te ajuta sa te conectezi mai bine cu intuita ta si sa vezi adevarul din tot ce te inconjoara, readucand echilibrul spiritual in viata ta.
</p>
<br/>



<ul>
<li><b style="fontWeight:800" >963 Hz – conexiunea cu Universul</b>
<br/>
</li>
<br/>

</ul>

<p style="fontWeight:600" >

Echilibreza chakra coroana (Sahasrara), activeaza intuitia si glanda pineala, creste nivelul de energie si vibratie pozitiva si te ajuta sa te conectezi cu Sursa intregii creatii.
</p>
<br/>


<p style="fontWeight:600" >

Incepe aceasta calatorie chiar astazi prin ZEN, aplicatia revolutionara care-ti schimba viata.
</p>
<br/>


`,
  },
  termeni: {
    title: "IN ATENTIA UTILIZATORILOR!",
    content: `<p style="fontWeight:800; fontSize:30px">
        Pentru a achiziționa un abonament sau pentru a beneficia de unul deja activ, utilizatorii trebuie să își creeze un cont în aplicație (prin butonul de profil situat în colțul din dreapta sus al paginii de start), această condiție fiind necesară pentru accesul complet la toate materialele audio disponibile în aplicație.
    </p>`,
  },
};

const getinfos = async (req, res) => {
  res.status(200).json({ data: infos[req.params.id] });
};

export { getinfos };
