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
    title: "Termeni si conditii",
    content: `
    <h1>IN ATENTIA UTILIZATORILOR!</h1>
    <h2>
       <b>
        Pentru a achiziționa un abonament sau pentru a beneficia de unul deja activ, utilizatorii trebuie să își creeze un cont în aplicație (prin butonul de profil situat în colțul din dreapta sus al paginii de start), această condiție fiind necesară pentru accesul complet la toate materialele audio disponibile în aplicație.
    </h2>
    <br/>

    <p>
    Acești termeni și condiții de utilizare constituie un contract între dvs. și editorul aplicației ZEN App, denumită în cele ce urmează ”Aplicația„. Vă rugăm să îi citiți. Acești termeni sunt valabili pentru aplicațiile pe care le descărcați din Google Play si Apple Store, inclusiv pentru actualizările sau suplimentele pentru aplicație.
    </p>
    <br/>
    <p>
    
Aplicația este construită exclusiv in scopuri recreationale și de suport si nu are ca obiectiv oferirea de sfaturi medicale, recomandari legale sau servicii profesionale. Daca simtiti ca aveti o problema medicala, ar trebui sa va adresati de urgenta unui medic.
    </p>
    <br/>
    <p>
Folosirea acestei aplicații implica acceptarea termenilor si conditiilor de mai jos. Recomandam citirea cu atentie a acestora. Zen Records SRL isi asuma dreptul de a modifica aceste prevederi fara o alta notificare.
    </p>
    <br/>
    <p>
    
Accesul/folosirea acestei aplicații de catre dumneavoastra se supune Termenilor si conditiilor de utilizare, si implica acceptul explicit al dumneavoastra cu privire la acestea si reprezinta intelegerea dintre parti.
Relatia dintre parti este guvernata de urmatoarele acte normative:

    </p>
    <ul>
      <li>OG nr. 21/1992 privind protectia consumatorilor</li>
      <li>OUG nr. 34/2014 privind drepturile consumatorilor in cadrul contractelor incheiate cu profesionistii</li>
      <li>Legea nr. 363/2007 privind combaterea practicilor incorecte ale comerciantilor in relatia cu consumatorii si armonizarea reglementarilor cu legislatia europeana privind protectia consumatorilor
</li>
      <li>Legea 365/2002 privind comertul electronic</li>
      <li>Legea 8/1996 privind dreptul de autor și drepturile conexe</li>
    </ul>
    <br/>
    <p>
Odată cu achiziționarea aplicației sunteți de acord cu toți termenii și condițiile de utilizare, beneficiind de drepturile descrise și toate obligațiile corespunzătoare.</p>
<ol>
    <li> DREPTURI DE INSTALARE ȘI UTILIZARE.
    <p>Aveți dreptul să instalați și să utilizați aplicația pe dispozitive mobile, în conformitate cu prezentele condiții și termeni. Zen Records SRL își rezervă dreptul de a modifica Regulile de utilizare în orice moment.
    </p>
    </li>
    <li>SERVICII BAZATE PE INTERNET.
        <p>a. Consimțământ pentru serviciile bazate pe internet sau wireless. În cazul în care aplicația se conectează la sistemele informatice prin internet, inclusiv prin intermediul unei rețele wireless, utilizarea aplicației reprezintă consimțământul dvs. pentru transmiterea unor informații standard despre dispozitive (inclusiv, fără limitare, informații tehnice despre dispozitiv, sistem și aplicație, precum și despre periferice) pentru serviciile prin internet sau wireless. În cazul în care sunt furnizați alți termeni în legătură cu utilizarea de către dvs. a serviciilor accesate utilizând aplicația, se aplică și termenii respectivi.
<br/>
<br/>
b. Abuzurile legate de serviciile prin internet. Nu aveți dreptul să utilizați niciun serviciu prin internet într-un mod care l-ar putea pune în pericol sau care ar putea afecta utilizarea sa ori a rețelei wireless de către orice persoană. Nu aveți dreptul să utilizați serviciul în încercarea de a obține, în orice fel, acces neautorizat la servicii, date, conturi sau rețele

</p>
    </li>
    <li>LIMITAREA DREPTURILOR DE UTILIZARE A APLICAȚIEI. Principiu: trebuie să respectați toate limitările de natură tehnică ale aplicației, care vă permit să o utilizați numai în anumite moduri. <br/>
      <p>
      Utilizarea acestei aplicații este supusă urmatoarelor conditii de utilizare si tuturor legilor si regulamentelor aplicabile. Accesand si utilizand aplicația, acceptati, fara limitari sau calificari, aceste conditii si luati la cunostinta ca orice alte acorduri intre Dumneavoastra si Zen Records S.R.L. sunt inlocuite prin prevederile prezentelor Conditii de Utilizare. Daca nu sunteti de acord sau nu acceptati, fara limitari sau calificari, Conditiile de Utilizare ale acestei aplicații, va rugam sa nu o downlodați/cumpărați.
<br/>
      Nu aveți dreptul:
<br/>

a. să încălcați nicio limitare de natură tehnică a aplicației;
<br/>
b. să refaceți codul sursă, să decompilați sau să dezasamblați aplicația, cu excepția și numai în limita permisă în mod expres de dispozițiile legii drepturilor de autor în vigoare pentru programe de calculator;
<br/>
c. să faceți mai multe copii ale aplicației decât numărul specificat în acest contract sau permis de legea aplicabilă, în ciuda acestei limitări;
<br/>
d. să publicați sau să puneți la dispoziție în alt mod aplicația pentru ca alții să o poată copia;
<br/>
e. să închiriați, să dați în leasing sau să împrumutați aplicația;
<br/>
f. să transferați aplicația sau contractul unei terțe părți.      
      </p>
    </li>
    <li>SERVICII DE ASISTENȚĂ. Contactați editorul aplicației pentru a stabili dacă sunt disponibile servicii de asistență.</li>
    <li>PROPRIETATEA APLICAȚIEI ȘI CONTINUTULUI.
    <p>Aplicația si tot ceea ce cuprinde acesta, incluzind fara limitare toate textele si imaginile (“Continut”) sunt in proprietatea si sub dreptul de autor (copyright) al Zen Records S.R.L.. Este strict interzisa utilizarea oricarui Continut, cu exceptia celor prevazute in Conditiile de Utilizare, fara permisiunea in scris a proprietarului “Continutului”. De asemenea, va informăm ca Aplicația și Conținutul beneficiază de recunoasterea și apărarea drepturilor de proprietate intelectuala in conformitate cu legile in vigoare, ajungind daca este cazul la actionarea celor vinovati de incalcarea dreptului de proprietate intelectuala in judecata prin instantele civile/penale.</p></li>
    <li>UTILIZAREA APLICAȚIEI. VÂRSTA LIMITĂ.
      <p>
      Poti cumpăra/folosi aplicația doar dacă ai 18 ani. Este permisă cumpărarea/folosirea aplicației de către persoanele între 16 și 18 ani, numai cu permisiunea unui adult sau tutore legal.
</p>
      <p>
      Înţelegeţi şi sunteţi de acord că serviciile şi orice alte informaţii pe care le invatati din această aplicație nu sunt destinate, proiectate, sau recomandate implicit pentru a diagnostica, a preveni sau trata orice afecţiune sau boală, sau pentru a evalua starea dumneavoastră de sănătate, sau sa substituie îngrijirea medicală profesională. Nu utilizaţi Aplicația în timpul conducerii autovehiculului, operarii utilajelor grele sau efectuarii altor sarcini care necesită o atenţie şi concentrare sporite. Înţelegeţi şi sunteţi de acord că sunteţi singurul responsabil pentru utilizarea Aplicației.
</p>
      <p>
      Zen Records S.R.L. acorda permisiunea de a utiliza Aplicația in urmatoarele conditii:
      </p>
      <p>
      Puteti folosi Continutul, insa doar pentru folosul personal si ne-comercial si cu conditia de a va conforma cu informatiile referitoare la dreptul de autor (copyright) si alte drepturi de proprietate intelectuala cuprinse in Continut;
Nu aveti permisiunea sa distribuiti, sa modificati, sa copiati (cu exceptia celor mai sus mentionate), sa transmiteti, sa expuneti, sa refolositi, sa reproduceti, sa publicati, sa autorizati, sa acordati o licenta de folosire, sa creati lucrari derivate din, sau sa transferati, sa vindeti sau sa folositi Continutul in alt mod, fara acordul in scris al Zen Records S.R.L.;
Este interzis sa folositi Aplicația în sens amenintator, fals, inselator, abuziv, de hartuire, licentios, calomniator, vulgar, obscen, scandalos, instigator, pornografic sau profanator, sau în orice alt fel care poate constitui sau incuraja un comportament ce va putea da nastere unei infractiuni, sau ar putea conduce la raspundere civila, sau ar incalca in alt mod legea. Zen Records S.R.L. va coopera cu oricare dintre autoritatile desemnate sa aplice legea si se va conforma cu orice sentinta judecatoreasca prin care se cere sau se ordona Zen Records S.R.L. sa dezvaluie identitatea oricarei persoane care ar folosi sau manifesta în orice fel vreun comportament descris mai sus și de care are cunoștință; 
Este interzis sa utilizati Aplicația in scop de publicitate sau pentru orice fel de cerere/oferta cu caracter comercial.
      </p>  
    </li>
    <li>
    CONFIDENTIALITATE
    <p>
    Orice date cu caracter personal precum: numele, adresa, numarul de telefon sau adresa de e-mail a dumneavoastra pe care o transmiteti prin Aplicație, Terți sau posta electronica, ori prin alta modalitate, vor fi folosite in conformitate cu Politica de Confidentialitate. Orice fel de comunicari pe care le transmiteti Editorilor Aplicației, precum intrebari, comentarii, sugestii sau alte mesaje de acest fel vor fi considerate ca neconfidentiale si neprotejate de drepturi de proprietate intelectuala determinate.
    </p>
    </li>
    <li>LIPSA GARANTIILOR
    <p>
    INTREG CONTINUTUL ACESTE APLICAȚII POATE FI MODIFICAT SI VA ESTE OFERIT “CA ATARE”, ”CU TOATE DEFECTELE” ȘI „AȘA CUM ESTE DISPONIBILĂ” FARA A SE OFERI NICI O GARANTIE DE NICI UN FEL, FIE ACEASTA EXPRESA SAU IMPLICITA.
    </p>
    </li>
    <li>
    EXONERAREA DE RASPUNDERE
    <p>
    UTILIZAREA ACESTEI APLICAȚII ESTE IN TOTALITATE PE CONTUL DUMNEAVOASTRA. ZEN RECORDS S.R.L. SAU ORICE ALTA PARTE IMPLICATA IN CONCEPEREA, PRODUCEREA SAU OFERIREA APLICAȚIEI NU SUNT RASPUNZATOARE PENTRU DAUNE DIRECTE SAU INDIRECTE, DE ORICE NATURA, CE AR REZULTA DIN SAU IN LEGATURA CU UTILIZAREA ACESTEI APLICAȚII SAU A CONTINUTULUI SAU. ZEN RECORDS S.R.L. NU ISI ASUMA NICI O RESPONSABILITATE SI NU VA FI RASPUNZATOARE PENTRU NICI O DAUNA SAU VIRUSI CARE AR PUTEA SA VA INFECTEZE COMPUTERUL SAU ALTE BUNURI IN URMA ACCESARII SAU UTILIZARII ACESTEI APLICAȚII, SAU DESCARCARII ORICARUI MATERIAL, INFORMATII, TEXT, IMAGINI VIDEO SAU AUDIO DE PE/PRIN INTERMEDIUL APLICAȚIEI.NU OFERIM NICIO GARANTIE CU PRIVIRE LA ACURATETEA, CALITATEA, COMPLEXITATEA, SERIOZITATEA, VERIDICITATEA, ACTUALITATEA CONTINUTULUI APLICAȚIEI.
Aplicația nu oferă sfaturi medicale. Conținutul este doar în scop informativ. Consultați-vă medicului (medicul general) cu privire la toate problemele medicale referitoare la starea dumneavoastră și la tratamentul acesteia. Conținutul nu este destinat să înlocuiască sfatul medical, diagnosticul sau tratamentul medical. Nu înlocuiește un examen medical și nici nu înlocuiește necesitatea serviciilor furnizate de profesioniștii din domeniul medical. Solicitați întotdeauna sfatul medicului dumneavoastră înainte de a face orice modificare a tratamentului dumneavoastră. Orice întrebare medicală trebuie adresată medicului dumneavoastră personal.

    </p>
    </li>
     <li>
MIJLOACE    
    <p>
    Așteptările terapiei: fiecare persoană răspunde diferit, așa că planificăm și adaptăm terapia dvs. pentru a se potrivi cel mai bine nevoilor dvs., cerințelor individuale și tipului de personalitate. Folosim o abordare multimodală a terapiei bazată pe nevoile dumneavoastră individuale.
Nu există garanții că oricare dintre aceste direcții de acțiune vă va rezolva problemele. Intenția noastră este de a vă ajuta să vă ajutați, facilitând o conștientizare profundă a ceea ce vă deranjează de fapt și ajutându-vă să vă determinați să faceți schimbările adecvate. Nu vă putem promite că vă putem ajuta, cu toate acestea, vă putem promite că vom face tot posibilul pentru a vă ajuta.
Ceea ce plătiți este timpul nostru profesional și nu neapărat un remediu.
Există posibilitatea să vi se ceară să faceți exerciții între ședințe și depinde de dvs. să întreprindeți aceste sarcini pentru a obține beneficii pozitive și progresie în tratamentul și recuperarea dumneavoastră.
Orice material, procedeu sau informație detaliată în această aplicație nu este destinată diagnosticării, tratamentului, vindecării sau protejării împotriva oricărei boli sau a unei boli, solicitați întotdeauna sfatul unui medic calificat.
APLICAȚIA NU ESTE RECOMANDATĂ PERSOANELOR CARE SE CONFRUNTĂ CU TULBURĂRI MENTALE SAU BOLI.
Nu ascultați și nu redați niciodată piese sau sunete în timp ce conduceți sau folosiți echipamente, selectați întotdeauna un mediu sigur. Produsele audio au fost dezvoltate pentru a vă oferi asistență și nu vă oferă nicio garanție; tu însuți poți fi singura persoană care poate oferi o garanție pentru propriul succes.

    </p>
    </li>
     <li>
 LIMITAREA MĂSURILOR REPARATORII ȘI A DAUNELOR    
    <p>
    
a. Editorul aplicației nu este responsabil pentru niciun conținut al utilizatorilor sau pentru alte materiale terță parte, inclusiv linkuri către site-uri terțe și activități furnizate de utilizatori. Astfel de conținut și activități nu pot fi atribuite editorului aplicației și nici nu reprezintă punctul de vedere al acestuia.
<br/><br/>
b. Editorul aplicației va fi responsabil doar dacă au fost încălcate obligații importante prevăzute în acești termeni ai licenței.
<br/><br/>

c. Editorul aplicației, agenții săi delegați și/sau reprezentanții săi legali nu vor fi responsabili pentru niciun fel de daune imprevizibile și/sau pierderi financiare legate de orice daune indirecte, inclusiv pierderi de profit, cu excepția cazului în care editorul aplicației, agenții săi delegați și/sau reprezentanții săi legali au acționat cel puțin cu neglijență gravă sau prin abateri săvârșite cu intenție.
    </p>
    </li>
     <li>
LINK-URI PE SITE-URILE UNEI TERTE PARTI.    
    <p>
    Aplicația poate contine link-uri catre alte aplicații/site-uri aflate in proprietatea sau operate de alte parti decit Zen Records S.R.L.. Astfel de link-uri va sunt furnizate pentru a le folosi numai daca veti dori aceasta. Zen Records S.R.L. nu controleaza, si nu este raspunzatoare pentru continutul si conditiile de confidentialitate sau securitate si de functionalitatea acestor aplicații/site-uri. Fara a se limita la cele mai sus mentionate, Zen Records S.R.L. isi declina in mod special orice raspundere daca aceste site-uri:
<br/>
    a. Incalca drepturile de proprietate intelectuala ale unei terte parti;
<br/>
<br/>

    b. Sunt inexacte, incomplete sau contin informatii inselatoare;
<br/>
<br/>
c. Nu au caracter comercial sau nu raspund indeplinirii unui anumit scop;
<br/>
<br/>
d. Nu ofera o securitate adecvata;
<br/>
<br/>
e. Contin virusi sau alte elemente cu caracter distructiv; sau
<br/>
<br/>
f. Sunt licentioase sau calomnioase.
<br/>
<br/>
De asemenea, Zen Records S.R.L. nu autorizeaza continutul sau orice alte produse si servicii prevazute pe astfel de site-uri. Daca intrati printr-un link pe astfel de aplicații/site-uri, va asumati personal riscul, fara a exista in acest sens permisiunea Zen Records S.R.L..

    </p>
    </li>
     <li>
    
REVIZUIRI ALE ACESTOR CONDITII DE UTILIZARE    <p>
    Zen Records S.R.L. poate, in orice moment si fara notificare prealabila, sa revizuiasca acești Termeni și Conditii de Utilizare prin actualizarea acestora. Sunteti obligat sa respectati oricare si toate astfel de revizuiri ce vor face obiectul actualizarilor periodice.
    </p>
    <p>    
    UTILIZATI ACEASTĂ APLICAȚIE PE PROPRIA RĂSPUNDERE. NICI ZEN RECORDS S.R.L., NICI DIRECTORII SAU MANAGERII, NICI AGENTII SAI SAU TERTII IMPLICATI IN CREAREA, PRODUCEREA SAU LIVRAREA APLICAȚIEI NU SUNT RESPONSABILI PENTRU DAUNELE DIRECTE, INDIRECTE, PUNITIVE, INCIDENTALE, SPECIALE, LOGICE SAU ALTE DAUNE LEGATE DE UTILIZAREA ACESTEI APLICAȚII SAU A CONTINUTULUI, INDIFERENT DACA SE REALIZEAZA PE BAZA UNUI CONTRACT, RESPONSABILITATE STRICTA SAU ALTA MODALITATE, CHIAR CU AVERTIZAREA PRIVIND POSIBILITATEA UNOR ASTFEL DE DAUNE.
</p>
    </li>
     <li>
    LEGISLATIE APLICABILA SI JURISDICTIE
    <p>
    Aceste Conditii de Utilizare si utilizarea acestei aplicații sunt guvernate de legile din Romania. Instantele competente din Romania vor avea jurisdictie exclusiva asupra oricaror si tuturor disputelor ce vor aparea din sau se vor referi la sau vor fi in legatura cu prevederile Conditiilor de Utilizare si/sau Continutul aplicației sau in cazul disputelor in care aceste Conditii de Utilizare si/sau această aplicație vor fi considerate fapte relevante pentru astfel de dispute.

    </p>
    </li>
     <li>
Daca ai întrebări despre Termeni si Conditii sau vrei sa ne spui parerea ta, te rugam sa contactezi Zen Records S.R.L. la social@zenapp.ro.    
    </li>
</ol>
    `,
  },
};

const getinfos = async (req, res) => {
  res.status(200).json({ data: infos[req.params.id] });
};

export { getinfos };
