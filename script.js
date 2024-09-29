const chatIcon = document.getElementById('chat-icon');
const chatboxWindow = document.getElementById('chatbot-window');

chatIcon.addEventListener('click', function() {
  chatboxWindow.classList.toggle('active');
});

const closeButton = document.getElementById('close-button');

closeButton.addEventListener('click', function() {
  chatboxWindow.classList.remove('active');
});

document.getElementById('send-button').addEventListener('click', function() {
  sendMessage();
});

document.getElementById('clear-button').addEventListener('click', function() {
  clearMessage();
});

function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

function clearMessage() {
  document.getElementById("input").value = "";
}


const userMessage = [
  ["hi", "hii", "Hii", "Hi", "hey", "hello"],
  ["sure", "yes", "no"],
  ["how to take admission", "admission process", "admission", "How can I apply for admission?"],
  ["principal's name", "who is the principal", "principal"],
  ["contact details", "contact", "Contact", "phone number", "address", "How do I contact the school administration?"],
  ["programs", "courses", "study options", "What programs do you offer?"],
  ["age for admission", "admission eligibility"],
  ["thanks", "thank you"],
  ["Can you tell me about the school's facilities?"]
];

const botReply = [
  ["Welcome to the official website of Municipal Urdu School No4. How can I help you?"],
  ["Okay"],
  ["To take admission, you can visit our website's admission page or contact our admission office for more information."],
  ["The principal's name is Mrs Tabassum Solapure."],
  ["You can contact us at 7058546713. Or you can visit us at 6th Lane, Near Shamrao Patil Natyagruh, Jaysingpur 416101 "],
  ["We offer programs including Anganwadi, Balwadi, and preschool."],
  ["Admission to our programs is based on age. For more details, please visit our admission page or contact our admission office."],
  ["You're welcome!"],

];

const alternative = [
  "Understood.",
  "That's clear.",
  "Please proceed.",
  "Please ask another question.",
  "I'm here to assist you."
];
let recommendedQuestions = [
  "How can I apply for admission? (you can also type : admission)",
  "What programs do you offer? (you can also type : programs)",
  "Who is the principal of the school? (you can also type : principal)",
  "How can I contact the school administration? (you can also type : contact)",
];
let oldRecommendedQuestion = null;

function recommendQuestion() {
  if (recommendedQuestions.length === 0) {
    recommendedQuestions = [
      "How can I apply for admission? (you can also type : admission)",
    "What programs do you offer? (you can also type : programs)",
    "Can you tell me about the school's facilities? (you can also type : facilities)" ,
    "Who is the principal of the school? (you can also type : principal)",
    "How can I contact the school administration? (you can also type : contact)",
    ];
    return oldRecommendedQuestion ? oldRecommendedQuestion : "No more recommended questions.";
  }
  const randomIndex = Math.floor(Math.random() * recommendedQuestions.length);
  const recommendedQuestion = recommendedQuestions[randomIndex];
  oldRecommendedQuestion = recommendedQuestion;
  recommendedQuestions.splice(randomIndex, 1); // Remove the selected question from the array
  return recommendedQuestion;
}

// Call this function when you want to recommend a question to the user
function recommendQuestionToUser() {
  const recommendedQuestion = recommendQuestion();
  addChat("Recommended question", recommendedQuestion);
}


function sendMessage() {
  const inputField = document.getElementById("input");
  let input = inputField.value.trim();
  input != "" && output(input);
  inputField.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("input");
  const clearButton = document.getElementById("clear-button");
  
  // Event listener for the "Clear" button
  clearButton.addEventListener("click", function() {
    recommendedQuestions = [
      "How can I apply for admission? (you can also type : admission)",
      "What programs do you offer? (you can also type : programs)",
      "Can you tell me about the school's facilities? (you can also type : facilities)" ,
      "Who is the principal of the school? (you can also type : principal)",
      "How can I contact the school administration? (you can also type : contact)",
    ];
    oldRecommendedQuestion = null;
    const messageSection = document.getElementById("message-section");
    messageSection.innerHTML = ""; // Clear the chat window
  });

  inputField.addEventListener("keydown", function(e) {
    if (e.code === "Enter") {
      let input = inputField.value.trim();
      input != "" && output(input);
      inputField.value = "";
    }
  });
});


function output(input) {
  let product;

  let text = input.toLowerCase().replace(/[^\w\s\d]/gi, "");

  text = text
    .replace(/[\W_]/g, " ")
    .replace(/ a /g, " ")
    .replace(/i feel /g, "")
    .replace(/whats/g, "what is")
    .replace(/please /g, "")
    .replace(/ please/g, "")
    .trim();

  let comparedText = compare(userMessage, botReply, text);

  product = comparedText
    ? comparedText
    : alternative[Math.floor(Math.random() * alternative.length)];
  addChat(input, product);

  // Recommend a question to the user
  recommendQuestionToUser();
}


function compare(triggerArray, replyArray, string) {
  let item;
  for (let x = 0; x < triggerArray.length; x++) {
    for (let y = 0; y < replyArray.length; y++) {
      if (triggerArray[x][y] == string) {
        items = replyArray[x];
        item = items[Math.floor(Math.random() * items.length)];
      }
    }
  }
  if (item) return item;
  else return containMessageCheck(string);
}

function containMessageCheck(string) {
  let expectedReply = [
    ["Good Bye", "Bye, See you!"],
    ["Good Night", "Have a sound sleep"],
    ["Have a pleasant evening!", "Good evening too"],
    ["Good morning, Have a great day!", "Morning!"],
    ["Good Afternoon", "Noon!"]
  ];
  let expectedMessage = [
    ["bye", "tc", "take care"],
    ["night", "good night"],
    ["evening", "good evening"],
    ["morning", "good morning"],
    ["noon"]
  ];
  let item;
  for (let x = 0; x < expectedMessage.length; x++) {
    if (expectedMessage[x].includes(string)) {
      items = expectedReply[x];
      item = items[Math.floor(Math.random() * items.length)];
    }
  }
  return item;
}

function addChat(input, product) {
  const mainDiv = document.getElementById("message-section");
  let userDiv = document.createElement("div");
  userDiv.id = "user";
  userDiv.classList.add("message");
  userDiv.innerHTML = `<span id="user-response">${input}</span>`;
  mainDiv.appendChild(userDiv);

  let botDiv = document.createElement("div");
  botDiv.id = "bot";
  botDiv.classList.add("message");
  botDiv.innerHTML = `<span id="bot-response">${product}</span>`;
  mainDiv.appendChild(botDiv);
  var scroll = document.getElementById("message-section");
  scroll.scrollTop = scroll.scrollHeight;
}
