/* eslint-disable no-unneeded-ternary */
/* eslint-disable max-lines */
const moment = require('moment');
const pdf = require('html-pdf-node');
const { customErrorMessages } = require('../../utils/helpers');
const sendMail = require('../../utils/sendMail');
const InvoiceModel = require('../../model/invoiceModel');
const UserModel = require('../../model/user');

const invoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoiceDetails = await InvoiceModel.findById(id);
    const { manager_name } = await UserModel.findById(invoiceDetails.userId);

    if (!invoiceDetails) {
      throw new Error('Invoice not found');
    }

    if (!manager_name) {
      throw new Error('Add manager name to your profile');
    }

    const {
      account_holder_name = '',
      account_number = '',
      account_type = '',
      amounts = [],
      bank_name = '',
      branch_name = '',
      date = '',
      email = '',
      ifsc_code = '',
      invoice_number = '',
      mobile_no = '',
      name = '',
      pan_number = '',
      nid_number = '',
      qr_code = '',
    } = invoiceDetails;

    const total_amount = amounts.reduce(
      (acc, { amount }) => acc + Number(amount),
      0
    );
    const amount_keys = amounts.map(({ description }) => description);
    const amount_values = amounts.map(({ amount }) => amount);

    const invoiceHTML = `<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Document</title>
          <style>
            * {
              margin: 0;
              padding: 0;
              border: 0;
              box-sizing: border-box;
              font-size: 100%;
              font: inherit;
              font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
                "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
              vertical-align: baseline;
            }
            body {
              -webkit-print-color-adjust: exact; /* Add this line */
            }
          </style>
        </head>
        <body
          style="
            max-width: 800px;
            margin: auto;
            border: 1px solid gray;
            height: 800px;
            border-radius: 10px;
            padding: 20px;
          "
        >
          <div style="display: flex; justify-content: space-between">
            <h1 style="font-size: x-large; font-weight: 800">${name}</h1>
            <h1 style="font-size: 40px; font-weight: 800; color: #7b8dc5">INVOICE</h1>
          </div>
          <div
            style="display: flex; justify-content: space-between; margin-top: 10px"
          >
            <p></p>
            <div>
              <div><span>Date: </span> <span>${moment(date).format(
                'YYYY-MM-DD'
              )}</span></div>
              <div><span>Invoice: </span> <span>${invoice_number}</span></div>
              <div><span>${pan_number ? 'PAN' : 'NID'}: </span><span>${
                pan_number ? pan_number : nid_number
              }</span></div>
            </div>
          </div>
          <div>
            <h1
              style="
                background-color: #3b4e87;
                color: white;
                max-width: 400px;
                padding: 3px 5px;
              "
            >
              INVOICE TO
            </h1>
            <div style="margin-top: 5px; margin-bottom: 10px">
              <p>CLING INFO TECH WORKS (OPC) PRIVATE LIMITED</p>
              <p>KAILASH NARAIN 2-652 BUDHI VIHAR AVAS VIKAS</p>
              <p>MBD MURADABAD Moradabad</p>
              <p>UP 244001 IN</p>
            </div>
          </div>
      
          <div style="width: 100%">
            <div style="border: 1px solid black; height: 200px">
              <div
                style="
                  background-color: #3b4e87;
                  color: white;
                  padding: 3px 5px;
                  display: flex;
                  justify-content: space-between;
                "
              >
                <p>DESCRIPTION</p>
                <p>AMOUNT</p>
              </div>
              <div style="display: flex; justify-content: space-between">
                <div>
                    ${amount_keys.map((key) => `<p>${key}</p>`).join('')}
                </div>
                <div style="display: flex; gap: 50px">
                  <div
                    style="
                      border-left: 1px solid black;
                      margin-top: 0;
                      height: 173px;
                      width: 80px;
                      text-align: end;
                    "
                  >
                    ${amount_values.map((value) => `<p>₹${value}</p>`).join('')}
                  </div>
                  <div
                    style="
                      border-left: 1px solid black;
                      margin-top: 0;
                      height: 173px;
                      width: 100px;
                      text-align: end;
                    "
                  >
                    ${amount_values.map((value) => `<p>₹${value}</p>`).join('')}
                  </div>
                </div>
              </div>
            </div>
            <div style="border: 1px solid black; border-top: 0">
              <div style="display: flex; justify-content: space-between">
                <div></div>
                <div style="display: flex; gap: 50px">
                  <div
                    style="border-left: 1px solid black; margin-top: 0; width: 80px"
                  >
                    <p>Total</p>
                  </div>
                  <div
                    style="
                      border-left: 1px solid black;
                      margin-top: 0;
                      width: 100px;
                      text-align: end;
                    "
                  >
                    <p>₹${total_amount}</p>
                  </div>
                </div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div></div>
              <div
                style="
                  display: flex;
                  gap: 50px;
                  border: 1px solid black;
                  border-top: 0;
                  border-left: 0;
                "
              >
                <div style="border-left: 1px solid black; margin-top: 0; width: 80px">
                  <p></p>
                </div>
                <div
                  style="
                    border-left: 1px solid black;
                    margin-top: 0;
                    width: 100px;
                    text-align: end;
                  "
                >
                  <p>---</p>
                </div>
              </div>
            </div>
            <div style="display: flex; justify-content: space-between">
              <div></div>
              <div
                style="
                  display: flex;
                  gap: 50px;
                  border: 1px solid black;
                  border-top: 0;
                  border-left: 0;
                "
              >
                <div style="border-left: 1px solid black; margin-top: 0; width: 80px">
                  <p></p>
                </div>
                <div
                  style="
                    border-left: 1px solid black;
                    margin-top: 0;
                    width: 100px;
                    text-align: end;
                  "
                >
                  <p>---</p>
                </div>
              </div>
            </div>
          </div>
  <div style="display: flex; justify-content: space-between;">
    <div style="width: 60%;">
            <h1
              style="
                background-color: #3b4e87;
                color: white;
                max-width: 400px;
                padding: 3px 5px;
                margin-top: 10px;
              "
            >
              BANK DETAILS
            </h1>
            <div
              style="
                margin-top: 5px;
                margin-bottom: 10px;
                border: 1px solid black;
                max-width: 400px;
                margin-top: 0;
                padding-left: 2px;
              "
            >
              <p style="border-bottom: 1px solid black">
                Account Holder Name: ${account_holder_name}
              </p>
              <p style="border-bottom: 1px solid black">Bank Name: ${bank_name}</p>
              <p style="border-bottom: 1px solid black">Branch Name: ${
                branch_name || '---'
              }</p>
              <p style="border-bottom: 1px solid black">
                Account Number: ${account_number}
              </p>
              <p style="border-bottom: 1px solid black">Account Type: ${account_type}</p>
              <p>IFSC Code: ${ifsc_code || '---'}</p>
            </div>
          </div>
       <div style="width: 30.5%; height: 160px; overflow: hidden;">
           <img src="${
             qr_code
               ? qr_code
               : 'https://thumb.ac-illust.com/0f/0f2b58416b6049826e349536913c766d_w.jpeg'
           }" style="width: 100%; height: 100%; object-fit: cover;" />
         </div>
      </div>  
         <div style="padding-top: 30px">
            <p style="text-align: center">
              If you have any questions about this invoice, please contact
            </p>
            <p style="text-align: center">
              [${account_holder_name}, ${mobile_no} , ${email}]
            </p>
          </div>
        </body>
      </html>
      `;

    const options = { format: 'A4' };
    const pdfBuffer = await pdf.generatePdf({ content: invoiceHTML }, options);
    const attachments = [
      {
        filename: 'invoice.pdf',
        content: pdfBuffer,
        encoding: 'base64',
      },
    ];

    const today = new Date();
    today.setMonth(today.getMonth() - 1);

    const previousMonthName = new Intl.DateTimeFormat('en-US', {
      month: 'long',
    }).format(today);
    const previousMonthYear = today.getFullYear();
    sendMail({
      to: ['accounts@clinginfotech.com'],
      cc: [manager_name, email],
      subject: `#CLING-INVOICING-${previousMonthName}-${previousMonthYear}-${name}`,
      message: '',
      attachments: attachments,
    });

    await InvoiceModel.findByIdAndUpdate(id, { status: 'sent' });

    res.status(200).json({ success: true, message: 'Invoice generated' });
  } catch (error) {
    const message = customErrorMessages(error);
    const status = error.isJoi ? 422 : 400;
    res.status(status).json({ success: false, message: message });
  }
};

module.exports = invoice;
