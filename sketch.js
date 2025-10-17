let table;

function preload() {
  // put preload code here
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  //controllo se ho caricato i dati
  console.log(table);

  let outerPadding = 40;
  let padding = 20;
  let itemSize = 60; 

  //colonne
  let cols = floor((windowWidth - outerPadding * 2) / (itemSize + padding));

  let rows = ceil(table.getRowCount() / cols);

  let gridWidth = cols * itemSize + (cols - 1) * padding;
  
  let centeredPaddingX = (windowWidth - gridWidth) / 2;

  let totalHeight = outerPadding * 2 + rows * itemSize + (rows - 1) * padding;


  createCanvas(windowWidth, totalHeight);
  background(245, 240, 230); // beige chiaro

  console.log("cols: ", cols, "rows: ", rows);
  
  let colCount = 0;
  let rowCount = 0;

  // funzione drawGlyph()

  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++) {

    let data = table.getRow(rowNumber).obj;

    let xPos = centeredPaddingX + colCount * (itemSize + padding) + itemSize / 2;
    let yPos = outerPadding + rowCount * (itemSize + padding) + itemSize / 2;

    //glifo
    drawGlyph(xPos, yPos, data, itemSize);

    colCount++;

    //controllo se sono alla fine della riga
    if(colCount == cols) {
      colCount = 0;
      rowCount++;
    }
  }
}

// Omino stilizzato

function drawGlyph(x, y, data, size) {
  // Estraggo i valori dalle colonne
  let val0 = parseFloat(data['column0']);
  let val1 = parseFloat(data['column1']);
  let val2 = parseFloat(data['column2']);
  let val3 = parseFloat(data['column3']);
  let val4 = parseFloat(data['column4']);

  // Calcolo min/max per ogni colonna
  let allVal0 = table.getColumn("column0");
  let allVal1 = table.getColumn("column1");
  let allVal2 = table.getColumn("column2");
  let allVal3 = table.getColumn("column3");
  let allVal4 = table.getColumn("column4");

  // disegni omini
  
  // column0 -> altezza dell'omino 
  let bodyHeight = map(val0, min(allVal0), max(allVal0), size * 0.4, size * 0.8);
  
  // column1: rotazione braccia 
  let armRotation = map(val1, min(allVal1), max(allVal1), -PI/3, PI/3);

  // column2: colore 
  let colorValue = map(val2, min(allVal2), max(allVal2), 0, 1);
  let c1 = color(100, 40, 160);   // viola più scuro
  let c2 = color(255, 140, 50);   // arancione
  let bodyColor = lerpColor(c1, c2, colorValue);

  // column3: larghezza corpo
  let bodyWidth = map(val3, min(allVal3), max(allVal3), bodyHeight * 0.3, bodyHeight * 0.6);
  
  // column4 -> apertura gambe 
  let legSpread = map(val4, min(allVal4), max(allVal4), 0, PI/6);


  push(); 
  
  // traslo l'origine al centro del glifo
  translate(x, y);
  
  // Proporzioni dell'omino
  let headSize = bodyHeight * 0.25;
  let legLength = bodyHeight * 0.4;
  let armLength = bodyHeight * 0.35;
  
  
  strokeWeight(2);
  stroke(255); // bordo bianco 
  strokeCap(ROUND);
  
  // testa
  fill(bodyColor);
  circle(0, -bodyHeight/2 - headSize/2, headSize);
  
  // corpo
  fill(bodyColor);
  stroke(255);
  strokeWeight(2);
  ellipse(0, 0, bodyWidth, bodyHeight);
  
  // braccia
  push();
  translate(0, -bodyHeight/4); // traslazione
  
  // Braccio sinistro
  push();
  rotate(armRotation); // rotazione (column1)
  strokeWeight(3);
  stroke(bodyColor);
  line(0, 0, -armLength, 0);
  // Mano 
  fill(bodyColor);
  noStroke();
  circle(-armLength, 0, headSize * 0.3);
  pop();
  
  // Braccio destro
  push();
  rotate(-armRotation); // rotazione opposta
  strokeWeight(3);
  stroke(bodyColor);
  line(0, 0, armLength, 0);
  // Mano
  fill(bodyColor);
  noStroke();
  circle(armLength, 0, headSize * 0.3);
  pop();
  
  pop(); // fine braccia
  
  // gambe
  push();
  translate(0, bodyHeight/2); 
  
    // Gamba sinistra
  push();
  rotate(-legSpread); // rotazione basata su column4
  strokeWeight(3);
  stroke(bodyColor);
  line(0, 0, 0, legLength);
  // Piede
  fill(bodyColor);
  noStroke();
  circle(0, legLength, headSize * 0.3);
  pop();
  
  // Gamba destra
  push();
  rotate(legSpread); 
  strokeWeight(3);
  stroke(bodyColor);
  line(0, 0, 0, legLength);
  // Piede (elemento comune)
  fill(bodyColor);
  noStroke();
  circle(0, legLength, headSize * 0.3);
  pop();
  
  pop(); // fine gambe
  
  pop(); 
}

function draw() {
  // put drawing code here
}