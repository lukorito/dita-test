async function handleSubmit(event) {
  event.preventDefault();
  const publishType = getPublishType();
  const docType = getDocType();

  if (!publishType || !docType) {
    let displayError = document.querySelector(".display-error");
    let container = document.createElement("div");
    container.classList.add("alert", "alert-danger");
    container.setAttribute("role", "alert");
    let text = document.createTextNode(
      "Please select both Publish type and Doc Type"
    );
    container.appendChild(text);
    displayError.appendChild(container);
  }

  let file = document.getElementById("file-upload").files[0];

  if (file) {
    let data = new FormData();
    data.append("file", file);
    console.log(publishType.value, docType.value);
    data.append("publishType", publishType.value);
    data.append("docType", docType.value);
    fetch("http://localhost:5000/upload", {
      method: "POST",
      body: data
    }).then(data => {
      window.alert("Upload successful");
    });
  }
}

function getPublishType() {
  let checked = document.querySelector("input[name=publish-type]:checked");
  return checked;
}

function getDocType() {
  let checked = document.querySelector("input[name=doc-type]:checked");
  return checked;
}

window.addEventListener("load", function() {
  document
    .getElementById("upload-form")
    .addEventListener("submit", handleSubmit);
});

window.addEventListener("error", function(event) {
  console.log(event.error, "errrrrrrrrr");
});
