// import React from "react";
// import "./BillDisplay.css";

// const BillDisplay = ({ bills }) => {
//   return (
//     <div className="container my-5">
//       {bills.map((bill, index) => (
//         <div key={index} className="card mb-4 shadow-sm">
//           <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
//             <h5 className="mb-0">Invoice #{bill._id.slice(-6)}</h5>
//             <div className="badge bg-light text-primary">Dev Electronics</div>
//           </div>

//           <div className="card-body">
//             {/* Shop Details */}
//             <div className="row mb-4">
//               <div className="col-md-6">
//                 <h6 className="fw-bold">Shop Details:</h6>
//                 <div className="ps-3">
//                   <p className="mb-1">{bill.shop_details.shop_name}</p>
//                   <p className="mb-1">{bill.shop_details.shop_address}</p>
//                   <p className="mb-1">
//                     Contact: {bill.shop_details.shop_contact}
//                   </p>
//                   <p className="mb-1">GST No: {bill.shop_details.gst_no}</p>
//                   <p className="mb-1">PAN: {bill.shop_details.pan_no}</p>
//                 </div>
//               </div>
//               <div className="col-md-6 text-md-end">
//                 <h6 className="fw-bold">Customer Details:</h6>
//                 <div className="pe-3">
//                   <p className="mb-1">{bill.customer_name}</p>
//                   <p className="mb-1">{bill.customer_location}</p>
//                   <p className="mb-1">Contact: {bill.customer_contact}</p>
//                 </div>
//               </div>
//             </div>

//             {/* Items Table */}
//             <div className="table-responsive">
//               <table className="table table-bordered">
//                 <thead className="table-light">
//                   <tr>
//                     <th>Item Name</th>
//                     <th>Description</th>
//                     <th>Quantity</th>
//                     <th>Price/Item</th>
//                     <th>Price × Qty</th>
//                     <th>GST %</th>
//                     <th>GST Amount</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {bill.purchased_items.map((item, idx) => (
//                     <tr key={idx}>
//                       <td>{item.item_info.item_name}</td>
//                       <td>{item.item_info.item_desc}</td>
//                       <td>{item.quantity}</td>
//                       <td>₹{item.item_info.price}</td>
//                       <td>₹{item.item_info.price * item.quantity}</td>
//                       <td>{item.gstPercentage}%</td>
//                       <td>₹{item.gst_amount}</td>
//                       <td>₹{item.total_amount}</td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>

//             {/* Bill Summary */}
//             <div className="row justify-content-end">
//               <div className="col-md-4">
//                 <div className="card bg-light">
//                   <div className="card-body">
//                     <div className="d-flex justify-content-between mb-2">
//                       <span>Subtotal:</span>
//                       <span>
//                         ₹
//                         {bill.purchased_items.reduce(
//                           (acc, item) => acc + item.item_amount,
//                           0
//                         )}
//                       </span>
//                     </div>
//                     <div className="d-flex justify-content-between mb-2">
//                       <span>GST:</span>
//                       <span>
//                         ₹
//                         {bill.purchased_items.reduce(
//                           (acc, item) => acc + item.gst_amount,
//                           0
//                         )}
//                       </span>
//                     </div>
//                     <div className="d-flex justify-content-between fw-bold">
//                       <span>Total:</span>
//                       <span>₹{bill.total_bill}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="card-footer text-center text-muted">
//             <small>Thank you for shopping with Dev Electronics!</small>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BillDisplay;

import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./BillDisplay.css";

const BillDisplay = ({ bills }) => {
  const printRef = useRef();

  const handleDownloadPDF = async () => {
    const element = printRef.current;
    const canvas = await html2canvas(element, {
      scale: 2, // better quality
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("invoice.pdf");
  };

  return (
    <div className="container my-5">
      {/* Wrap printable content */}
      <div>
        {bills.map((bill, index) => (
          <div key={index}>
            <button
              className="btn btn-success mb-3"
              onClick={handleDownloadPDF}
            >
              Download Invoice as PDF
            </button>

            <div ref={printRef} key={index} className="card mb-4 shadow-sm">
              {/* ...your full existing JSX as it is... */}
              <i className="fa fa-xing" aria-hidden="true"></i>
              <div key={index} className="card mb-4 shadow-sm">
                <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
                  <h5 className="mb-0">Invoice #{bill._id.slice(-6)}</h5>
                  <div className="badge bg-light text-primary">
                    Dev Electronics
                  </div>
                </div>

                <div className="card-body">
                  {/* Shop Details */}
                  <div className="row mb-4">
                    <div className="col-md-6">
                      <h6 className="fw-bold">Shop Details:</h6>
                      <div className="ps-3">
                        <p className="mb-1">{bill.shop_details.shop_name}</p>
                        <p className="mb-1">{bill.shop_details.shop_address}</p>
                        <p className="mb-1">
                          Contact: {bill.shop_details.shop_contact}
                        </p>
                        <p className="mb-1">
                          GST No: {bill.shop_details.gst_no}
                        </p>
                        <p className="mb-1">PAN: {bill.shop_details.pan_no}</p>
                      </div>
                    </div>
                    <div className="col-md-6 text-md-end">
                      <h6 className="fw-bold">Customer Details:</h6>
                      <div className="pe-3">
                        <p className="mb-1">{bill.customer_name}</p>
                        <p className="mb-1">{bill.customer_location}</p>
                        <p className="mb-1">Contact: {bill.customer_contact}</p>
                      </div>
                    </div>
                  </div>

                  {/* Items Table */}
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="table-light">
                        <tr>
                          <th>Item Name</th>
                          <th>Description</th>
                          <th>Quantity</th>
                          <th>Price/Item</th>
                          <th>Price × Qty</th>
                          <th>GST %</th>
                          <th>GST Amount</th>
                          <th>Total</th>
                        </tr>
                      </thead>
                      <tbody>
                        {bill.purchased_items.map((item, idx) => (
                          <tr key={idx}>
                            <td>{item.item_info.item_name}</td>
                            <td>{item.item_info.item_desc}</td>
                            <td>{item.quantity}</td>
                            <td>₹{item.item_info.price}</td>
                            <td>₹{item.item_info.price * item.quantity}</td>
                            <td>{item.gstPercentage}%</td>
                            <td>₹{item.gst_amount}</td>
                            <td>₹{item.total_amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* Bill Summary */}
                  <div className="row justify-content-end">
                    <div className="col-md-4">
                      <div className="card bg-light">
                        <div className="card-body">
                          <div className="d-flex justify-content-between mb-2">
                            <span>Subtotal:</span>
                            <span>
                              ₹
                              {bill.purchased_items.reduce(
                                (acc, item) => acc + item.item_amount,
                                0
                              )}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>GST:</span>
                            <span>
                              ₹
                              {bill.purchased_items.reduce(
                                (acc, item) => acc + item.gst_amount,
                                0
                              )}
                            </span>
                          </div>
                          <div className="d-flex justify-content-between fw-bold">
                            <span>Total:</span>
                            <span>₹{bill.total_bill}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card-footer text-center text-muted">
                  <small>Thank you for shopping with Dev Electronics!</small>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BillDisplay;
