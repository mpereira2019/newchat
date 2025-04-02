// Tu clave API de OpenAI
const openaiAPIKey = "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";  // Reemplaza con tu clave API

// El modelo de OpenAI que deseas usar (por ejemplo, gpt-3.5-turbo o gpt-4)
const assistantModel = "gpt-4";  // Puedes cambiar el modelo según tu preferencia

// Función para manejar el envío de mensajes a OpenAI
async function sendToOpenAI(message) {
    const url = "https://api.openai.com/v1/chat/completions";  // Endpoint de la API de OpenAI

    const headers = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${openaiAPIKey}`,  // Aquí se coloca la clave API
    };

    const body = JSON.stringify({
        model: assistantModel,
        messages: [{ role: "user", content: message }],  // El mensaje del usuario
        max_tokens: 150,  // Ajusta el límite de tokens (puedes modificarlo según lo necesites)
    });
	
	console.log("Enviando solicitud a OpenAI:", body);  // Mostrar la solicitud enviada

    try {
        // Realizar la solicitud POST a la API de OpenAI
        const response = await fetch(url, {
            method: "POST",
            headers: headers,
            body: body,
        });

        const data = await response.json();
		console.log("Respuesta de OpenAI:", data);  // Mostrar la respuesta recibida


        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            // Devuelve la respuesta del modelo de OpenAI
            return data.choices[0].message.content;
        } else {
            console.error("Error en la solicitud:", data);  // Muestra detalles del error
            return "Lo siento, ocurrió un error al procesar tu solicitud.";
        }
    } catch (error) {
        console.error("Error al conectar con OpenAI:", error);
        return "Lo siento, ocurrió un error al procesar tu solicitud.";
    }
}

// Función para manejar la interacción con el usuario en el frontend
function handleChat() {
    const userMessage = document.getElementById("user-input").value;  // Obtiene el mensaje del usuario
    if (userMessage.trim() === "") return;

    // Muestra el mensaje del usuario en el chat
    appendMessage(userMessage, "user");

    // Limpia el campo de entrada
    document.getElementById("user-input").value = "";

    // Envia el mensaje a OpenAI y muestra la respuesta
    sendToOpenAI(userMessage).then((responseMessage) => {
        // Muestra la respuesta del asistente
        appendMessage(responseMessage, "assistant");
    });
}

// Función para mostrar los mensajes en el chat
function appendMessage(message, sender) {
    const chatBox = document.getElementById("chat-box");

    const messageElement = document.createElement("div");
    messageElement.classList.add(sender);
    messageElement.innerText = message;

    chatBox.appendChild(messageElement);
}

// Manejador para el evento de envío del formulario
document.getElementById("chat-form").addEventListener("submit", function (event) {
    event.preventDefault();  // Previene el envío por defecto del formulario
    handleChat();  // Llama a la función para manejar el chat
});
