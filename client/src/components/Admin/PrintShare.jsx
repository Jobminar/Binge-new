import React, { useRef } from "react";
import PropTypes from "prop-types";
import { Button, Dropdown, DropdownButton } from "react-bootstrap";
import { FaWhatsapp, FaEnvelope, FaPrint } from "react-icons/fa";
import logoImg from "../../assets/images/logo.png";

const PrintShare = ({ userDetails }) => {
  const componentRef = useRef();

  const customLabels = {
    theaterType: "Theatre Type",
    name: "Customer Name",
    contact: "Contact Number",
    date: "Booking Date",
    time: "Booking Time",
    numOfPeople: "Number of People",
    addons: "Add-ons",
    CGST: "CGST",
    SGST: "SGST",
    generatedBill: "TOTAL AMOUNT",
    dueAmount: "Due Amount",
  };

  const handlePrint = () => {
    // Generate random invoice number and payment ID
    const invoiceNumber = Math.floor(Math.random() * 100000);
    const paymentId = Math.floor(Math.random() * 100000);

    const printWindow = window.open("", "_blank");

    printWindow.document.write(
      '<html><head><title>Invoice</title><style>body { font-family: "Arial", sans-serif; background-color: #f2f2f2; margin: 0; padding: 0; display: flex; align-items: center; justify-content: center; height: 100vh; } .invoice { max-width: 600px; width: 100%; padding: 20px; border: 1px solid #ccc; background-color: #fff; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); } .logo { text-align: center; margin-bottom: 20px; } .logo img { max-width: 100%; height: auto; } h2 { text-align: center; color: #8b0000; margin-bottom: 20px; } .header { background-color: #2c3e50; color: #fff; padding: 10px; border-radius: 5px; margin-bottom: 20px; } .details { margin-bottom: 20px; } .footer { text-align: justify; margin-top: 20px; font-size: 12px; color: #555; } .actions { text-align: center; margin-top: 20px; } .close-button { cursor: pointer; color: #888; } .print-button { background-color: #4caf50; color: white; padding: 10px 20px; border: none; border-radius: 5px; font-size: 16px; cursor: pointer; } .share-dropdown { display: inline-block; position: relative; } .share-dropdown-content { display: none; position: absolute; background-color: #f9f9f9; min-width: 160px; box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2); z-index: 1; } .share-dropdown-content a { color: black; padding: 12px 16px; text-decoration: none; display: block; } .share-dropdown-content a:hover { background-color: #ddd; } .share-dropdown:hover .share-dropdown-content { display: block; }</style></head><body>'
    );

    printWindow.document.write('<div class="invoice">');

    // Header Section
    printWindow.document.write(
      '<div class="header"><img src="' + logoImg + '" alt="Logo"/></div>'
    );
    printWindow.document.write("<h2>Binge-inn Invoice</h2>");

    // Body Section
    printWindow.document.write('<div class="details">');
    Object.keys(userDetails).forEach((key) => {
      const label = customLabels[key] || key;
      const value = userDetails[key];
      printWindow.document.write(
        `<p><strong>${label}:</strong> <span style="float:right;">${value}</span></p>`
      );
    });

    // Additional details
    printWindow.document.write(
      `<p><strong>Invoice Number:</strong> <span style="float:right;">${invoiceNumber}</span></p>`
    );
    printWindow.document.write(
      `<p><strong>Payment ID:</strong> <span style="float:right;">${paymentId}</span></p>`
    );

    // Footer Section
    printWindow.document.write('<div class="footer">');
    printWindow.document.write("<p><strong>Terms and Conditions:</strong></p>");
    printWindow.document.write(
      "<p>This is a sample invoice. Payment is due within 30 days. Late payments are subject to a 10% fee.</p>"
    );
    printWindow.document.write("</div>");

    // Actions Section
    printWindow.document.write('<div class="actions">');
    printWindow.document.write(
      '<span class="close-button" onclick="window.close()">Powered BY SANJO-INFOTECH & JOBMINAR</span>'
    );
    printWindow.document.write("</div>");

    printWindow.document.write("</div></body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  const handleShareWhatsApp = () => {
    // Create a formatted string for WhatsApp message
    let whatsappMessage = "🎉 Binge-inn Invoice 🎉\n\n";

    // Body Section
    Object.keys(userDetails).forEach((key) => {
      const label = customLabels[key] || key;
      const value = userDetails[key];
      whatsappMessage += `*${label}:* ${value}\n`;
    });

    // Footer Section
    whatsappMessage += "\n*Terms and Conditions:*\n";
    whatsappMessage +=
      "This is a sample invoice. Payment is due within 30 days. Late payments are subject to a 10% fee.\n";

    // Greetings
    whatsappMessage += "\nThank you for choosing Binge-inn! 🍿🎬";

    // Encode the message for a WhatsApp link
    whatsappMessage = encodeURIComponent(whatsappMessage);

    // Create a WhatsApp link with the formatted message
    const whatsappLink = `https://wa.me/?text=${whatsappMessage}`;

    // Open the link in a new window
    window.open(whatsappLink, "_blank");
  };

  const handleShareEmail = () => {
    console.log("Sharing via Email");
  };

  return (
    <div className="print-share-container">
      <div className="print-share-template" ref={componentRef}>
        <div className="actions">
          <Button className="print-button" onClick={handlePrint}>
            <FaPrint className="me-2" />
            Print Invoice
          </Button>
          <div className="share-dropdown ms-2 mt-1">
            <DropdownButton
              id="share-dropdown"
              title="Share"
              variant="secondary"
              className="share-dropdown"
            >
              <Dropdown.Item onClick={handleShareWhatsApp}>
                <FaWhatsapp className="me-2" />
                Share via WhatsApp
              </Dropdown.Item>
              <Dropdown.Item onClick={handleShareEmail}>
                <FaEnvelope className="me-2" />
                Share via Email
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </div>
    </div>
  );
};

PrintShare.propTypes = {
  userDetails: PropTypes.object.isRequired,
};

export default PrintShare;
