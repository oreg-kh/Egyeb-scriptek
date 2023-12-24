A kód a 8.192-es frissítéssel a játékba kerülő új felülethez készült, amit a Klán/Tagok menüben lehet elérni. Ezen belül a Csapatok fülön ki kell választanunk egy tagot, majd itt futtatni a scriptet. Fontos, hogy a klántagok megosszák az alapítóval seregeik és épületeik láthatóságát.(Lásd.: 1.kép)

1.ábra.PNG
1.kép​


Futtatás után létrehoz egy táblázatot. (Lásd.: 2.kép)

2.ábra.PNG
2.kép​
Gombok:

Hozzáadás: a tag kiválasztása után ezzel lehet hozzáadnia táblázathoz a játékos falvait, besorolja a megfelelő oszlopba.
Következő: nem szükséges a legördülő listából kiválasztanunk a következő játékost, a gombra klikkelve átugrik a soron következőre.(lefelé)
Törlés: lenyomásakor törlésre kerül a táblázatba bevitt összes adat(kivéve az összegzés sor), illetve a localStorage-ban eltárolt adatok is.
Összegzés: a táblázatba bevitt sorok alá generál egy fehér cellákból álló sort, itt összegzi a táblázat oszlopait. Új sorok hozzáadásakor érdemes újra megnyomni a gombot, ekkor kapjuk meg a friss eredményeket.
Excel: a gombra kattintva megnyit egy Excel táblázatot, amelyben lementi az egész táblázatot.
Fal: erre klikkelve eltárolja a falvakhoz tartozó falszinteket. Meg kell várni, míg végig megy az összes játékoson, tehát az oszlopában lévő piros körök zöldre váltanak.
Védekezés: erre nyomva eltárolja a faluban lévő védőket(saját+erősítés), a beérkező védőket és a beérkező támadások számát.
A táblázat sorainak végén is található egy-egy törlés gomb, ezzel lehetőségetek van egyesével is törölni a sorokat.​

A táblázatba bevitt adatok szerkeszthetőek, elég csak beleklikkelni a cellákba és átírni a tartalmukat. Kivétel ezek alól az 1., 11., 18., 19. oszlop.
A táblázat oszloponként rendezhető, csökkenő illetve növekvő sorrendbe. Elég csupán ráklikkelni az oszlop nevére.(odatolva a kurzort alá is húzza ezt nekünk) Kivétel ezek alól a 11., 18., 19. oszlop.



Térkép:
Amikor befejeztük az adatok kigyűjtését, átnavigálhatunk a térképre. Az előző felületen eltárolt adatainkat itt is felhasználhatjuk.

Gombok, jelölőnégyzetek, rádiógombok (Lásd.: 3.kép):

3.ábra.PNG
3.kép​
Excel: a gombra kattintva megnyit egy Excel táblázatot, amelyben lementi az egész táblázatot.
A táblázat sorainak végén is található egy-egy törlés gomb, ezzel lehetőségetek van egyesével is törölni a sorokat.
Kigyűjtés jelölőnégyzet: ezt bepipálva a térképen a falvakra(természetesen csak azoknál a falvaknál működik, amelyekhez eltároltuk az adatokat az előző felületen, aki nem klántag, illetve barbár-bónusz falu, klántag, de nem adta meg a hozzáférést nekünk, nem fog bekerülni a táblázatba!) kattintva eltárolja őket a lenti táblázatban. Kiszedve a pipát, ismét a normál funkciójának megfelelően működik tovább a térkép.
Falu saját egységei és Faluban lévő védők jelölőnégyzetek: mindig csak az egyiket lehet bepipálni, a másikat csak akkor, ha az előbbiből kivettük a pipát. Ezek összetartoznak, a felső sorát töltik ki a két sorból álló jelölésnek, amelyek megjelennek a falvakon.
Rádiógombok: Fal szint, Nemes, Beérkező védők, Beérkező támadás. Ezek összetartoznak, egyszerre csak az egyiket lehet használni. Ezek adják a a falvak jelölésének az alsó sorát.

A táblázat(Lásd.: 4.kép) itt is szerkeszthető, kivéve az 1. oszlopot, illetve rendezhető rákattintva az oszlop nevére.

4.ábra.PNG
4.kép​

A térképről néhány szót (Lásd.: 5.kép):
- a falu saját egységeit bepipálva zöld/piros körök 0-5 db jelzik, zöld, ha védő, piros, ha támadó.
- 1 kör, ha >1/4
- 2 kör, ha 1/4
- 3 kör, ha 1/2
- 4 kör, ha 3/4
- 5 kör, ha teljes a sereg
Ha nincs a faluban sereg, akkor nincs semmilyen kör, ha vegyes a falu, tehát a támadó és védő sereg száma megegyezik, akkor kék színű lesz az egész.

5.ábra.PNG
5.kép​

Az egységek számai mindig tanyahely szerint felszorzott értékek. Legyen az beérkező vagy faluban lévő csapat.

