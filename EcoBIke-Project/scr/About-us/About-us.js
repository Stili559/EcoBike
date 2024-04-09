// FAQ Logic
const FAQ = [
    {
      question: "Can I return a product ?",
      answer:
        "Yes, you can return items within 30 days of purchase, provided they are not damaged and in their original packaging, with proof of purchase."
    },
    {
      question: "What is the delivery time ?",
      answer:
        "Delivery times vary depending on your location, shipping method, and product availability. Typically, orders are processed and shipped within 5 business days. "
    },
    {
      question: "How do I reset my password ?",
      answer:
        "Enter you email in the login page filed and click “Forgot password”."
    },
    {
      question: "Are electric bikes legal ?",
      answer:
        "Laws regarding electric bikes vary, so it's essential to familiarize yourself with local regulations before riding."
    },
    {
      question: "Do you provide additional support ?",
      answer:
        "Chat and email support is available 24/7. Phone lines are open during normal business hours."
    }
  ];
  
  const mainContinerEl = document.getElementById("mainContiner");
  
  export function FAQuestions() {
    return FAQ.forEach((item) => {
      return createHTMLElements(item.question, item.answer);
    });
  }
  
  export function createHTMLElements(question, answer) {
    // Question Element
    const card = document.createElement("div");
    card.classList.add("card");
    const questionCont = document.createElement("div");
    questionCont.classList.add("question");
    card.appendChild(questionCont);
    const questionPara = document.createElement("div");
    questionPara.classList.add("questionpara");
    const questionEl = document.createElement("p");
    questionCont.appendChild(questionPara);
    questionPara.appendChild(questionEl);
    questionEl.innerHTML = question;
    const arrowCont = document.createElement("div");
    const arrowImg = document.createElement("img");
    arrowImg.src ="https://firebasestorage.googleapis.com/v0/b/ecobike-bb6cc.appspot.com/o/arrow.png?alt=media&token=9faedf84-8356-42b2-b0e4-37aca5278148";
    arrowCont.classList.add("arrowCont");
    arrowCont.appendChild(arrowImg);
    questionCont.appendChild(arrowCont);
  
    // Answer Element
    const answerCont = document.createElement("div");
    answerCont.classList.add("answer");
    const answerPara = document.createElement("div");
    answerPara.classList.add("answerPara");
    answerCont.appendChild(answerPara);
    const answerEl = document.createElement("p");
    answerEl.innerHTML = answer;
    answerPara.appendChild(answerEl);
    card.appendChild(answerCont);
    mainContinerEl.appendChild(card);
  }
  
  FAQuestions();
  
  const allCont = mainContinerEl.querySelectorAll(".card");
  
  allCont.forEach((e) => {
    const btn = e.querySelector(".question");
  
    btn.addEventListener("click", (pos) => {
      allCont.forEach((item) => {
        if (item !== e) {
          item.classList.remove("active");
        }
      });
      e.classList.toggle("active");
    });
  });
  
  