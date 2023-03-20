const apiKey = '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' //La clé de l'API openai
const chatWindow = document.getElementById("chat-window") //Sélectionne la div dans laquelle devra se dérouler tout le chat
const Btn = document.getElementById('btn') //Sélectionne le bouton d'envoi des questions de l'utilisateur


// Lorsque qu'on procède cette façon (Btn.addEventListener()), plus besoin d'appeler la fonction dans la balise ouvrante du bouton (<button>)
Btn.addEventListener('click', async(e) => {
        e.preventDefault() //Permet de stopper le comportement par défaut du bouton
        const userInput = document.getElementById("user-input").value
        const userRequest = document.createElement('div')
        userRequest.setAttribute('class', 'user-message')
        userRequest.innerHTML = `<span>${userInput}</span>`
        chatWindow.appendChild(userRequest)

        document.getElementById('user-input').value = '' 
        /* Cette ligne ci-dessus permet d'écraser le contenu de l'input après que celui-ci ait cliqué sur le bouton d'envoi.
        Remarque: Si vous écrivez useInput = '', ça ne marchera pas car 
        en effet, en faisant cela, c'est le contenu de la variable que vous écrasez, pas celui l'input.*/

        // Ici, notez que nous pouvons utiliser deux méthodes pour la requête: GET ou POST (voir CRUD sur Google)
        const data =   {
                        model: "text-davinci-003",
                        prompt: userInput,
                        max_tokens: 800,
                        n: 1,
                        stop: ["\n"],
                        temperature: 0
                }

        const config = {
                headers : {
                                'Content-Type' : 'application/json',
                                "Authorization" : "Bearer "  + apiKey // Ici, le + est l'opérateur de concaténation 
                        }  //AUtre façon de concaténer: `Bearer ${apiKey}`; les caratères `` sont appelés backtick
                        // Sous windows, on les obtient en faisant la combinaison ALT + 7. cette méthode a été utilisée plus haut.
        }  

        let response = await axios.post("https://api.openai.com/v1/completions", data, config)
        /* Notre API permet de completer du texte que l'utilisateur aura tapé. EX: Didier Drogba est
        L'API va nous fournir la suite, d'où le terme "completion"
        
        C'est au niveau de l'API que j'ai rencontré le plus gros problème après que vous soyez partis. En effet, le type de données 
        que j'ai entré n'était pas conforme à ce qui était attendu. Vous remarquerez que data et config sont des objets. */

        console.log(response)
        const botResponse = response.data.choices[0].text 
        /* Lorsque la réponse nous est fournie par l'API, elle est stockée dans "choices" qui, lui, 
        est un tableau dont le premier élément est "text" */
        const botAnswer = document.createElement('div')
        botAnswer.setAttribute('class', 'chatbot-answer')
        botAnswer.innerHTML = botResponse
        // le code suivant: botAnswer.innerHTML = `<div class=""><span>${botResponse}</span></div>` peut clairement remplacer les trois lignes précédentes.

        chatWindow.appendChild(botAnswer)

})






