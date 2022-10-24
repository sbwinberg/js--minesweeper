# JavaScript - MS RÖJ

Du använder dig av DOM:en för att interagera med HTML/CSS. Du använder enbart Vanilla JavaScript (inget ramverk/bibliotek). Din styling andas 90-tal eller så omvandlar du det klassiska spelet till en modern version  :floppy_disk: => :computer:

## Spelregler

Spelet går ut på att röja ett minfält utan att detonera någon av minorna. Det finns många varianter av minröj-spel men det mest kända är nog MS Röj som följde med tidigare versioner av Windows. 

Spelplanen består av ett rutnät där vissa rutor innehåller minor. För varje ny omgång skapas minfältet slumpmässigt, d.v.s ett x antal bomber läggs ut på spelplanen. Till en början är rutornas innehåll okänt. För att avslöja innehållet i en ruta klickar man på den.

- Om det visar sig att rutan innehåller en mina har man förlorat och spelet är över. 
- Om rutan inte innehåller en mina, men gränsar till minst en ruta som innehåller en mina, visas istället en siffra som talar om hur många minor det finns sammanlagt i de åtta omkringliggande rutorna. Med hjälp av dessa siffror kan man räkna ut vilka rutor som innehåller minor, och vilka som inte gör det.
- Extra: Om rutan inte gränsar till någon mina alls visas ingen siffra och alla okända omkringliggande rutor avslöjas automatiskt på samma sätt som när man klickar på dem. Detta innebär att ett enda klick ibland kan avslöjar stora områden där minor saknas.

Vinner gör man när alla rutor, som inte innehåller minor, har avslöjats.

## Markera minorna med flaggor ⚑
Genom att studera siffrorna som anger hur många minor rutorna gränsar till kan man räkna ut vilka rutor som innehåller minor. För att lättare hålla reda på var minorna är kan rutorna markeras med flaggor. 
Flaggorna kan placeras ut (och tas bort) genom att högerklicka på rutorna med muspekaren. 

## Olika modes

Det finns även tre olika topplistor beroende på hur stort minfält som används.

- Ett litet minfält består av minst 64 rutor och 16 % minor.
- Ett mellanstort minfält består av minst 256 rutor och 18 % minor.
- Ett stort minfält består av minst 576 rutor och 21 % minor.

## Exempelbild 
MS RÖJ small size 8x8 (https://github.com/chasacademy-sandra-larsson/js--minesweeper/blob/main/minesweeper.gif)
