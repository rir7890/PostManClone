console.log("this is my javascript ");

////utility function:
////1=> utility function to get DOM element from string
function getElementFromString(string) {
  let div = document.createElement("div");
  div.innerHTML = string;
  return div.firstElementChild;
}

//initialize the no of parameters
let addedParamCount = 0;
//hide the parameters box initialy
let parametersBox = document.getElementById("parametersBox");
parametersBox.style.display = "none";

////if the user clicks on parans , hide the json box
let paramsRadio = document.getElementById("paramsRadio");
paramsRadio.addEventListener("click", () => {
  document.getElementById("requestJsonBox").style.display = "none";
  document.getElementById("parametersBox").style.display = "block";
});

////if the user clicks on json , hide the params box
let jsonRadio = document.getElementById("jsonRadio");
jsonRadio.addEventListener("click", () => {
  document.getElementById("parametersBox").style.display = "none";
  document.getElementById("requestJsonBox").style.display = "block";
});

////if the user clicks on + button , then add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
  let params = document.getElementById("params");
  let string = `<div class="form-row my-2">
            <label for="url" class="col-sm-2 col-form-label">Parameter ${
              addedParamCount + 2
            }</label>
            <div class="col-md-10 my-4">
                <input
                type="text"
                class="form-control"
                id="parameterKey${addedParamCount + 2}"
                placeholder="Enter Parameter  ${addedParamCount + 2} Key"
                />
            </div>
            <div class="col-md-10 my-4">
                <input
                type="text"
                class="form-control"
                id="parameterValue${addedParamCount + 2}"
                placeholder="Enter Parameter  ${addedParamCount + 2} Value"
                />
            </div>
            <button class="btn btn-primary deleteParam">-</button>
            </div>`;

  ////convert the element string to dom node
  let paramElement = getElementFromString(string);
  //   console.log(paramElement);
  params.appendChild(paramElement);
  ////add an event listener to remove the parameter on clicking - button
  let deleteParam = document.getElementsByClassName("deleteParam");
  for (item of deleteParam) {
    item.addEventListener("click", (e) => {
      ////add a confirmation box to delete the parameter deletion
      e.target.parentElement.remove();
    });
  }
  addedParamCount++;
});

//// if the user clicks on the submit button
let submit = document.getElementById("submit");
submit.addEventListener("click", () => {
  //show please wait in the response box to request patience from the user
  document.getElementById("responseJsonText").value =
    "Please wait..... Fetching response.....";
  ////fetch all the values user has entered
  let url = document.getElementById("url").value;
  let requestType = document.querySelector(
    'input[name="requestType"]:checked'
  ).value;
  let contentType = document.querySelector(
    'input[name="contentType"]:checked'
  ).value;

  ////log all the values in the console for debugging
  ////  console.log(url);
  ////  console.log(requestType);
  ////  console.log(contentType);

  ///if user has used params option instead of json , collect all the parameters in an object
  if (contentType == "params") {
    data = {};
    for (let i = 0; i < addedParamCount + 1; i++) {
      if (document.getElementById("parameterKey" + (i + 1)) != undefined) {
        let key = document.getElementById("parameterKey" + (i + 1)).value;
        let value = document.getElementById("parameterValue" + (i + 1)).value;
        data[key] = value;
      }
      data = JSON.stringify(data);
    }
  } else {
    data = document.getElementById("requestJsonText").value;
  }
  //log all the value in the console for debugging
  console.log(url);
  console.log(requestType);
  console.log(contentType);
  console.log(data);

  //if the request type is post , invoke fetch api to create a post request
  if (requestType == "GET") {
    fetch(url, {
      method: "GET",
    })
      .then((response) => response.text())
      .then((text) => {
        document.getElementById("responseJsonText").value = text;
      });
  } else {
    fetch(url, {
      method: "POST",
      headers: {
        body: data,
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.text())
      .then((text) => {
        console.log(text);
        document.getElementById("responseJsonText").value = text;
      });
  }
});

////https://randomuser.me/api
////https://jsonplaceholder.typicode.com/posts

// ////remember to enter the request in string format in json format
// JSON.stringify({
//   title: "foo",
//   body: "bar",
//   userId: 1,
// });
