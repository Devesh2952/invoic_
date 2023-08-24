
// Restricking Future date selection
var currentDate = new Date().toISOString().split('T')[0];
document.getElementById('date').setAttribute('max', currentDate);



// Input name file restricked to num & special char
function validateTextInput(inputElement) {
    const inputValue = inputElement.value;
    const regex = /^[A-Za-z\s]*$/; // Regular expression for alphabetic characters and spaces

    if (!regex.test(inputValue)) {
        inputElement.value = inputValue.replace(/[^A-Za-z\s]/g, ''); // Remove non-alphabetic characters
    }
}

// Input Mobile number text file restricketed to alphabet
function validateNumberInput(inputElement) {
    const inputValue = inputElement.value;
    inputElement.value = inputValue.replace(/\D/g, ''); // Remove non-numeric characters
}


// for Add product button
function Addrow() {

    const custName = document.getElementById("cust_name").value;
    const custMob = document.getElementById("cust_mob").value;
    const date = document.getElementById("date").value;

    if (custName.trim() === "" || custMob.trim() === "" || date==="") {
        alert("Please provide ALL detailes before adding a product.");
        return; // Don't proceed if fields are not filled
    }


    var table = document.getElementById("show_table");
    var rowCount = table.rows.length;
    var row = table.insertRow(rowCount);

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);

    cell1.innerHTML = rowCount;
    cell2.innerHTML = document.getElementById("product").value;
    cell3.innerHTML = document.getElementById("product_rate").value;
    cell4.innerHTML = document.getElementById("quantity").value;
    cell5.innerHTML = document.getElementById("product_rate").value * document.getElementById("quantity").value;
    cell6.innerHTML = '<button class="delete-button" onclick="deleteRow(this)">Delete</button>';

    updateGrandTotal();
}

// Function to delete a row from the invoice table
function deleteRow(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    var rowNumber = parseInt(row.cells[0].innerHTML);
    table.removeChild(row);

    // Reorder serial numbers
    var rows = table.getElementsByTagName("tr");
    for (var i = rowNumber; i < rows.length; i++) {
        rows[i].cells[0].innerHTML = i;
    }

    updateGrandTotal();
}

// Function to update the grand total
function updateGrandTotal() {
    var table = document.getElementById("show_table");
    var rows = table.getElementsByTagName("tr");
    var grandTotal = 0;

    for (var i = 1; i < rows.length; i++) {
        var row = rows[i];
        var totalCell = row.cells[4];
        grandTotal += parseFloat(totalCell.innerHTML);
    }

    document.getElementById("total_amount").value = grandTotal.toFixed(2);
}

// Attach event listener to the form submission
document.getElementById("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission
    Addrow(); // Add row to the table
    // Reset form fields after adding a row
    document.getElementById("product").selectedIndex = 0;
    document.getElementById("quantity").value = "";
    document.getElementById("product_rate").value = "";
});

// Initialize the page
updateGrandTotal();


// Print button functionality
document.getElementById("printButton").addEventListener("click", function () {
    window.print();
});


function DistinctProducts() {
    var table = document.getElementById("show_table");
    var rowCount = table.rows.length;

    const productSet = new Set();

    for (let i = 1; i < rowCount; i++) {
        const row = table.rows[i];
        const cell = row.cells[1]; // Index 1 corresponds to "Product" column
        const product = cell.textContent.trim();
        if (product !== "") {
            productSet.add(product);
        }
    }

    var setsize = productSet.size;
    var totaladdproduct = rowCount - 1;

    if (setsize != totaladdproduct) {
        alert("Same Product Can not be appear twice.");
    
    }

    return productSet.size;
}


// Setting up invoice number

function Gen_inv() {
    var randomNum = Math.floor(Math.random() * 9999); // Change the range as needed
    return randomNum;
}

function redirectToInvoicePage() {
    var invoiceNumber = Gen_inv();
   // DistinctProducts();
      var totalDistinctProducts = DistinctProducts();

      var table = document.getElementById("show_table");
      var rowCount = table.rows.length;

      if(totalDistinctProducts!= rowCount-1){
        return;
      }
    // //  console.log(DistinctProducts());
    // Collect_form_data
    var name = document.getElementById("cust_name").value;
    var mobile = document.getElementById("cust_mob").value;
    var invoiceDate = document.getElementById("date").value;
    var grandTotal = document.getElementById("total_amount").value;

    // Update the HTML elements with the invoice details
    document.getElementById("name").textContent = name;
    document.getElementById("mobile").textContent = mobile;
    document.getElementById("invoiceDate").textContent = invoiceDate;
    document.getElementById("invoiceNumber").textContent = invoiceNumber;
    document.getElementById("totalDistinctProducts").textContent = totalDistinctProducts;
    document.getElementById("grandTotal").textContent = grandTotal;

    // Show the invoice details section
    document.getElementById("invoice-details").style.display = "block";

}


// Print button functionality (as before)
document.getElementById("printButton").addEventListener("click", function () {
    window.print();
});







