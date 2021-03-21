import logo from './logo.svg';
import './App.css';
import { getTransactionInfo } from 'trny';
import { useState } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [data, setData] = useState({
    account: {
      type: '',
      no: '',
    },
    balance: '',
    money: '',
    typeOfTransaction: '',
  });
  const [selectedMessage, setSelectedMessage] = useState('');
  const dummyMessages = [
    'Your a/c XX0413 is debited on 15/12/2020 by INR 3,211.00 towards purchase. Avl Bal: INR 5,603.54.',
    'Dear Customer, Rs.248,759.00 is debited from A/c XXXX6791 for BillPay/Credit Card payment via Example Bank NetBanking. Call XXXXXXXX161XXX if txn not done by you',
    'UPDATE: Your A/c XX6791 credited with INR 15,160.00 on 20-11-2020 by A/c linked to mobile no XX79XX(IMPS Ref No. XX114XXXXX393) Available bal: INR 2,088,505.04',
    'Dear Customer, You have made a payment of Rs. 46000 using NEFT via IMPS from your Account XXXXXXXX0126 with reference number XXX387XXX on November 20, 2020 at 14:15.',
    'Acct XX126 debited with INR 46,000.00 on 20-Nov-2020 & Acct XX791 credited. IMPS: XXX410XX. Call XX0026XX for dispute or SMS BLOCK 126 to XXX5676XXX',
    'Dear bank cardmember, Payment of Rs 248759 was credited to your card ending 12344 on 20/Nov/2020.',
    "Alert: You've spent INR 555.00 on your Delhi Exapmle Bank card **91XXX at BD JIO MONEY on 20/11/2020 at 11:07AM IST. Please call XXX041XXX if this was not made by you.",
    'Thank you for making a payment of Rs. 3499.00 towards your Example Bank Card. This payment will be reflected as a credit on your Card account within 2 working days. Your payment reference number is XXX741270XXX. For any details you may log on to bankexample.com or our mobile app',
    'Your Debit card annual fee of Rs. 399.00 has been debited from your account.',
    'Dear Customer, Min payment Rs.175.00/total payment Rs.3499.00 for Hyderabad Example Card **********91000 is due by 27-11-2020. Please ignore if already paid.',
    'Dear Customer, your new savings bank account with no. 123456789 has been opened. -Ahmedabad Sahakari Bank Ltd.',
    'INR Rs. 399 debited from A/c no. 098900 on Avl Bal-INR Rs. 57575',
    'Avbl Bal for A/c XXXX0377  as on 30-06-2019 is INR 21719.25. Combined Avbl Bal is INR 21719.25. Use Mobile Banking App to track A/c (app.kotak.com)',
    'Your sb a/c **00981 is debited for rs.80 on 22-02-2021 by transfer avl bal rs:6802.04',
    'Rs49.0 debited@SBI UPI frm A/cX12345 on 18Dec20 RefNo 1212121212. If not done by u, fwd this SMS to 1234567890/Call 123456789 or 123456789 to block UPI',
    'Your SB A/c **12345 is Debited for Rs.100 on 01-01-2021 12:30:50 by Transfer. Avl Bal Rs:12345.30-Union Bank of India DOWNLOAD U MB HTTP://ONELINK.TO/BUYHR7',
  ];

  function handleExtraction() {
    if (message) {
      const extractedData = getTransactionInfo(message);

      setData(extractedData);
    } else {
      setData({});
    }
  }

  function handleSelection(e) {
    setMessage(e.target.value);
    setSelectedMessage(e.target.value);
  }

  return (
    <div className="container col-md-6">
      <div className="info">
        <p className="text-center mt-3 mb-5 fw-bold">
          Demo of <a href="https://github.com/minimal-scouser/trny">trny</a>
        </p>
      </div>
      <div className="row input-message form-group d-flex flex-md-row justify-content-center">
        <div className="">
          <label htmlFor="input-message">Message</label>
          <textarea
            className="form-control mb-3"
            type="text"
            name="input-message"
            value={message}
            placeholder="Enter message"
            onChange={(e) => {
              setMessage(e.target.value);
              if (selectedMessage !== '') {
                setSelectedMessage('');
              }
            }}
          />
        </div>
        <p className="text-center mb-0">or</p>
        <div className="mb-3">
          <label htmlFor="select-message">Select message</label>
          <select
            name="select-message"
            className="form-select"
            value={selectedMessage}
            onChange={handleSelection}
            onSelect
          >
            <option value="">Select</option>
            {dummyMessages.map((message) => {
              return <option value={message}>{message}</option>;
            })}
          </select>
        </div>
        <div>
          <button
            className="w-100 btn btn-primary mt-3"
            onClick={handleExtraction}
          >
            Extract
          </button>
        </div>
      </div>
      <div className="result mt-5 border p-3">
        <p>Account Number: {data.account && data.account.no}</p>
        <p>Money: {data.money}</p>
        <p>Balance: {data.balance}</p>
        <p>Type of Transaction: {data.typeOfTransaction}</p>
      </div>
      <div
        className="visit w-100 p-3 mt-3"
        style={{
          display: "flex",
          justifyContent: "center"
        }}
      >
        <a href="https://github.com/minimal-scouser/trny">
          <img
            src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
            height="32"
          />
        </a>
      </div>
    </div>
  );
}

export default App;
