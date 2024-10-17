const fs = require('fs-extra');
const xlsxfile = require('read-excel-file/node');



async function datosLayout (req, res){

    const data = await xlsxfile(req.file.path);

    let datos = [];

    for(let i in data){
        if(i!=0){
            let f_cad = new Date(data[i][12]);
            let f_fab = new Date(data[i][13]);
            let f_rec = new Date(data[i][14]);
            let consecu = Number(i) + 1;
            let dato = {
                CONSECUTIVO:consecu++,
                GPO: validarGPO(data[i][0],Number(i) + 1),
                GEN: validarGEN(data[i][1],Number(i) + 1),
                ESP: validarESP(data[i][2],Number(i) + 1),
                DIF: validarDIF(data[i][3],Number(i) + 1),
                VAR: validarVAR(data[i][4],Number(i) + 1),
                RFC_PROVEEDOR: validarRFC(data[i][5],Number(i) + 1),
                LOTE:data[i][6],
                ESTADO:data[i][7],
                CSUSPENSIVO:data[i][8],
                LINEA:data[i][9],
                LOCALIDAD:data[i][10],
                CANT_INV:data[i][11],
                FECHA_CAD:f_cad,
                FECHA_FAB:f_fab,
                FECHA_REC:f_rec,
                NO_ALTA:data[i][15],
                ESTADO_ANTERIOR:data[i][16],

            } ;
            datos.push(dato);
        }
    }

    await fs.remove(req.file.path);

    res.render("layout/listado",{datos});


}

function validarGPO(gpo, posicion){
    if(gpo.length > 3 || gpo.length < 3){
        console.log(`Error de la columna GPO en la Fila ${posicion} valor ${gpo}`);
    }else{
        if(gpo != "010" && gpo != "020" && gpo != "030" && gpo != "040" && gpo != "050" && gpo != "060" && gpo != "0670" && gpo != "080" ){
            console.log(`Error de la columna GPO en la Fila ${posicion} valor ${gpo}`);
        }
    }

    return gpo;
}

function validarGEN(gen, posicion){
    if(gen.length > 3 || gen.length < 3){
        console.log(`Error de la columna GEN en la Fila ${posicion} valor ${gen}`);
    }

    return gen;
}

function validarESP(esp, posicion){
    if(esp.length > 4 || esp.length < 4){
        console.log(`Error de la columna ESP en la Fila ${posicion} valor ${esp}`);
    }

    return esp;
}

function validarDIF(dif, posicion){
    if(dif.length > 2 || dif.length < 2){
        console.log(`Error de la columna DIF en la Fila ${posicion} valor ${dif}`);
    }else{
        if(dif != "00" && dif != "01" && dif != "02" && dif != "03" && dif != "04" && dif != "05"  ){
            console.log(`Error de la columna DIF en la Fila ${posicion} valor ${dif}`);
        }
    }

    return dif;
}

function validarVAR(vari, posicion){
    if(vari.length > 2 || vari.length < 2){
        console.log(`Error de la columna VAR en la Fila ${posicion} valor ${vari}`);
    }else{
        if(vari != "00"){
            console.log(`Error de la columna VAR en la Fila ${posicion} valor ${vari}`);
        }
    }

    return vari;
}


function validarRFC(rfc, posicion){
    if(rfc.length > 15 || rfc.length < 15){
        console.log(`Error de la columna RFC_PROVEEDOR en la Fila ${posicion} valor ${rfc}`);
    }

    return rfc;
}


function validarLOTE(lote, posicion){
    if(lote.length > 20 ){
        console.log(`Error de la columna LOTE en la Fila ${posicion} valor ${lote}`);
    }else{
        
    }

    return rfc;
}

function verLayout (req, res){
    res.render("layout/layouts");
}




module.exports = {
    verLayout,
    datosLayout
}