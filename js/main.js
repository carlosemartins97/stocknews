/* **********************************************************************************
Fatec Rubens lara - programação sitios internet - P2 - professor alexandre Garcia
alunos:  Carlos Eduardo Martins, Cyro Fernandes, Henrique Marchioni    - 3 ciclo - SI
**************************************************************************************
*/

//================================================================================================
var url_status = "/https://statusinvest.com.br/"
var obj_papeis = {       //--> objeto usado para os papeis em alta baixa do dia pagina index
    "papel_0": {                                       // indices:                              // js - He
            "ticket": "",                             // papel_0 a 5  -> altas açoes
            "preco": "",                             // papel_6 a 11   -> baixas açoes 
            "varia_percentual": "",                 // papel_12 a 17 ->  altas FII                                                               
            "imagem_icone": "", }                  // papel_18 a 23 -> baixas FII                                                              
           }                                      //                        
                                                 //               
//=======================================================================================================================
var url_inves_noticias = "/https://br.investing.com/news/latest-news/"   //       tag <article> - com as materias dentro     
var url_links = "https://br.investing.com"                              //        acesso - noticias[6] ao noticias[22]
//========================================================================================================================

var url_indices = "https://br.investing.com/indices/major-indices/"
var obj_indices = {     // --> objeto usado para captura dos principais index mundiais 
    "indice_0": {                                           // indice_0   dow jones        indice_4  ibovespa         indice_8  Shanghai
        "nome": "",                                        // indice_1    s&p 500          indice_5  dax
        "pontos":"",                                      // indice_2     nasdag           indice_6  EURO estoxx 50
        " variacao":"",}                                 // indice_3     sp 500 vix        indice_7  Nikkey
    }                                                   




function scrapping_altas_baixas(){
  
    //WEB SCRAPPING
    fetch("https://cors-anywhere.herokuapp.com"+url_status)
        .then(resp => resp.text())
        .then(x => { 
        let dom = new DOMParser();
        let doc = dom.parseFromString(x,"text/html");
        
        
        let papeis =  doc.querySelectorAll("a[role='listitem']")
        let img_altas_baixas = document.getElementsByName("imagem")
        let nome_papel = document.getElementsByName("nome")
        let preco_papel = document.getElementsByName("preco")
        let porcent = document.getElementsByName("porcent")

        
        let aux_i =0;
        //------------------------------------ (captura dos icones - nome - preço - variação percentual dos papeis altas e baixas do dia  (site status invest) )
        for ( let i=0 ; i <= 29 || aux_i <= 23 ; i++){    
            
            if (papeis[i].childNodes[3].attributes[0].value != "info dividend w-100"){ 
                                                                          
            let atributo = papeis[i].childNodes[1].childNodes[1].attributes[1].nodeValue.slice(4,-1);  //(url de uma cdn -> usar como atributo style background-image ou img src)
            let ticket = papeis[i].childNodes[3].childNodes[1].innerText
            let preco = "R$" + papeis[i].childNodes[3].childNodes[3].childNodes[3].childNodes[2].nodeValue
            let varia_percentual = papeis[i].childNodes[3].childNodes[3].childNodes[1].childNodes[2].nodeValue + "%"
        //---------------------------------------------------------------------------------------------------    
            obj_papeis["papel_"+aux_i] = { "ticket": ticket, "preco": preco, "varia_percentual": varia_percentual, "imagem_icone":atributo }  //-> prenchimento do objeto 
            
       
            //--------------------------------------------------------------------------------------------------------------------------------------  interação com html (prenchimento)       
            img_altas_baixas[aux_i].attributes[2].value = obj_papeis["papel_"+aux_i].imagem_icone   // --> colocando as imagens
            nome_papel[aux_i].innerHTML = obj_papeis["papel_"+aux_i].ticket   // --> colocando os nomes
            preco_papel[aux_i].innerHTML = obj_papeis["papel_"+aux_i].preco   // --> colocando os preços    
            porcent[aux_i].innerHTML = obj_papeis["papel_"+aux_i].varia_percentual   // --> colocando os preços  

            aux_i++
          }
        
        }
        
        //console.log(obj_papeis);
        })

        .catch(e => console.log(e))
    }
        //======================================================================================
function scrapping_noticias(){

        fetch("https://cors-anywhere.herokuapp.com"+url_inves_noticias)
        .then(resp => resp.text())
        .then(x => { 
        let dom = new DOMParser();
        let doc = dom.parseFromString(x,"text/html");
        
        let div_noticias = document.querySelector("div[name='noticias']")
        

        var noticias = doc.querySelectorAll("article[class='js-article-item articleItem   ']")
        for ( let i=6 ; i <= 22 ; i++){  
            noticias[i].childNodes[1].attributes[0].value = url_links + noticias[i].childNodes[1].attributes[0].value   // arrumando link que esta na imagem.
            let src_img = noticias[i].childNodes[1].childNodes[0].attributes[1].value   // pegando o atributo data-src que contem o endereço da imagem.
            noticias[i].children[0].children[0].setAttribute("src",src_img) // criando o atributo src e colocando o valor capturado acima.
            noticias[i].children[1].children[0].attributes[0].value = url_links + noticias[i].children[1].children[0].attributes[0].value // arrumando o link do texto

            div_noticias.appendChild(noticias[i])

        }
        //console.log(noticias[6]);
        

        })
        .catch(e => console.log(e))
    }
        //===========================================================================================================================================================
function scrapping_indices(){                        // js - He

        fetch("https://cors-anywhere.herokuapp.com/"+url_indices)
        .then(resp => resp.text())
        .then(x => { 
        let dom = new DOMParser();
        let doc = dom.parseFromString(x,"text/html");

        let indices = doc.querySelectorAll("tbody")

        //---------------------------------------------------------------
        let ibov_principal = document.querySelector('div[class="pts"]')

        let pontos_indice = document.getElementsByName("pontos_indice")
        let varia_indice = document.getElementsByName("varia_indice")


        //--------------------------------------------------------------    

        let nome = indices[0].children[0].children[1].children[0].innerHTML
        let pontos = indices[0].children[0].children[2].innerHTML
        let varia_Pindice = indices[0].children[0].children[6].innerHTML
        obj_indices["indice_0"] = {"nome":nome, "pontos":pontos, "variacao":varia_Pindice} // dow jones
        pontos_indice[0].innerHTML = obj_indices.indice_0.pontos
        varia_indice[0].innerHTML = obj_indices.indice_0.variacao

        let nome1 = indices[0].children[1].children[1].children[0].innerHTML
        let pontos1 = indices[0].children[1].children[2].innerHTML
        let varia_Pindice1 = indices[0].children[1].children[6].innerHTML
        obj_indices["indice_1"] = {"nome":nome1, "pontos":pontos1, "variacao":varia_Pindice1} //s&p 500
        pontos_indice[1].innerHTML = obj_indices.indice_1.pontos
        varia_indice[1].innerHTML = obj_indices.indice_1.variacao

        let nome2 = indices[0].children[2].children[1].children[0].innerHTML
        let pontos2 = indices[0].children[2].children[2].innerHTML
        let varia_Pindice2 = indices[0].children[2].children[6].innerHTML
        obj_indices["indice_2"] = {"nome":nome2, "pontos":pontos2, "variacao":varia_Pindice2} // nasdag
        pontos_indice[2].innerHTML = obj_indices.indice_2.pontos
        varia_indice[2].innerHTML = obj_indices.indice_2.variacao
        
        let nome3 = indices[0].children[4].children[1].children[0].innerHTML
        let pontos3 = indices[0].children[4].children[2].innerHTML
        let varia_Pindice3 = indices[0].children[4].children[6].innerHTML
        obj_indices["indice_3"] = {"nome":nome3, "pontos":pontos3, "variacao":varia_Pindice3} // sp 500 vix
        pontos_indice[3].innerHTML = obj_indices.indice_3.pontos
        varia_indice[3].innerHTML = obj_indices.indice_3.variacao
        
        let nome4 = indices[0].children[6].children[1].children[0].innerHTML
        let pontos4 = indices[0].children[6].children[2].innerHTML
        let varia_Pindice4 = indices[0].children[6].children[6].innerHTML
        obj_indices["indice_4"] = {"nome":nome4, "pontos":pontos4, "variacao":varia_Pindice4} // ibovespa
        pontos_indice[4].innerHTML = obj_indices.indice_4.pontos
        varia_indice[4].innerHTML = obj_indices.indice_4.variacao

        let nome5 = indices[0].children[8].children[1].children[0].innerHTML
        let pontos5 = indices[0].children[8].children[2].innerHTML
        let varia_Pindice5 = indices[0].children[8].children[6].innerHTML
        obj_indices["indice_5"] = {"nome":nome5, "pontos":pontos5, "variacao":varia_Pindice5} // dax
        pontos_indice[5].innerHTML = obj_indices.indice_5.pontos
        varia_indice[5].innerHTML = obj_indices.indice_5.variacao

        let nome6 = indices[0].children[11].children[1].children[0].innerHTML
        let pontos6 = indices[0].children[11].children[2].innerHTML
        let varia_Pindice6 = indices[0].children[11].children[6].innerHTML
        obj_indices["indice_6"] = {"nome":nome6, "pontos":pontos6, "variacao":varia_Pindice6} // EURO estoxx 50
        pontos_indice[6].innerHTML = obj_indices.indice_6.pontos
        varia_indice[6].innerHTML = obj_indices.indice_6.variacao

        let nome7 = indices[0].children[27].children[1].children[0].innerHTML
        let pontos7 = indices[0].children[27].children[2].innerHTML
        let varia_Pindice7 = indices[0].children[27].children[6].innerHTML
        obj_indices["indice_7"] = {"nome":nome7, "pontos":pontos7, "variacao":varia_Pindice7} // Nikkey
        pontos_indice[7].innerHTML = obj_indices.indice_7.pontos
        varia_indice[7].innerHTML = obj_indices.indice_7.variacao

        let nome8 = indices[0].children[29].children[1].children[0].innerHTML
        let pontos8 = indices[0].children[29].children[2].innerHTML
        let varia_Pindice8 = indices[0].children[29].children[6].innerHTML
        obj_indices["indice_8"] = {"nome":nome8, "pontos":pontos8, "variacao":varia_Pindice8} // Shanghai
        pontos_indice[8].innerHTML = obj_indices.indice_8.pontos
        varia_indice[8].innerHTML = obj_indices.indice_8.variacao

        //------------------------------------------------------------------------------------------------------------- interação com html (prenchimento)
        ibov_principal.innerHTML = obj_indices.indice_4.pontos + "<span id='pts-i'> pts</span>"   // ---> colocando indice ibov - principal 
            
        
        //console.log(obj_indices);
        })
        .catch(e => console.log(e))

}


