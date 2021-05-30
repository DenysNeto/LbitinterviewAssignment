import * as express from 'express';
export const routes = express.Router();
const fs = require('fs');

interface Template { 
    id: 'string',
    imgSource : 'string'
}

let allTemplates;
try {
    allTemplates = fs.readFileSync('data.json', 'utf8');
    allTemplates = JSON.parse(allTemplates);
} 
  catch (err) {
    console.error(err)
}
  
function updateDataJson(template: Template) 
{
    try {
        let index = allTemplates.findIndex((elem: Template) => elem.id == template.id);
        allTemplates[index] = template;
        fs.writeFileSync('data.json', JSON.stringify(allTemplates) );
    }
    catch (err) { 
        console.error("ERROR UPDATE DATA " ,  err)
    }
   
    
}



routes.get('/templates', (req, res) => res.send({ templates: allTemplates }));


routes.post('/templates', (req, res) => { 

    updateDataJson(req.body.template);
    res.send({ body: req.body })
}
    



);



