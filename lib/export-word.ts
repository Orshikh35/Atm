import type { Reports } from "@/types/reports";
interface BaseData {
    id: number;
  }


export function exportToWord(records: Reports[]) {
    const currentDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>ATM Тайлан</title>
      <style>
        body {
          font-family: 'Times New Roman', serif;
          margin: 40px;
          font-size: 14px;
          line-height: 1.6;
        }
        h1 {
          font-size: 16px;
          font-weight: bold;
          margin-bottom: 30px;
        }
        .record {
          margin-bottom: 50px;
          page-break-inside: avoid;
        }
        table {
          width: 100%;
          border: 1px solid #000;
          border-collapse: collapse;
        }
        td {
          vertical-align: top;
          padding: 10px;
        }
        .left {
          width: 50%;
          border-right: 1px solid #000;
        }
        .right {
          width: 50%;
          display: flex;
          flex-direction: column;
        }
        .field {
          margin-bottom: 8px;
        }
        .label {
          font-weight: bold;
          display: inline-block;
          width: 160px;
        }
        .description, .details {
          margin-top: 20px;
          padding: 10px;
          border: 1px solid #000;
        }
        .details {
          border-left: 4px solid #007acc;
          background-color: #f9f9f9;
        }
            .title-page .company {
          position: absolute;
          right: 50px;
          font-size: 14px;
          color: #4472C4;
          font-weight: bold;
        }
            .title-page .date {
            padding-top: 120px;
          position: absolute;
          right: 50px;
          font-size: 12px;
          color: #4472C4;
          font-weight: bold;
        }
             .title-page {
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          page-break-after: always;
          border: 2px solid #4472C4;
          padding: 40px;
          margin: 0;
        }
      </style>
    </head>
    <body>

     <div class="title-page">
        <h1>ATM-ийн Техник болон Програм<br>хангамжийн засвар үйлчилгээний тайлан</h1>
        <div class="date">${currentDate.toUpperCase()}</div>
        <div class="company">NEW COMPASS LLC</div>
      </div>
      </div>
      <h1>Бүх GRG АТМ-ууд</h1>

      ${records
        .map(
          (r) => `
          <div class="record">
            <table>
              <tr>
                <td class="left">
                  <div class="field"><span class="label">Төлөв:</span> ${r.status}</div>
                  <div class="field"><span class="label">Хариуцсан инженер:</span> ${r.technician}</div>
                  <div class="field"><span class="label">Хүсэлт илгээсэн:</span> ${r.fullName}</div>
                  <div class="field"><span class="label">Хүсэлт илгээсэн огноо:</span> ${r.requestedAt}</div>
                  <div class="field"><span class="label">Хаагдсан огноо:</span> ${r.completedAt || "Хаагдаагүй"}</div>
                </td>
                <td class="right">
                  <div class="label">Тайлбар</div>
                  <div>${r.description}</div>
                </td>
              </tr>
            </table>

            ${
              r.description
                ? `<div class="details">
                    <div class="label">Дэлгэрэнгүй</div>
                    <div>${r.description}</div>
                  </div>`
                : ""
            }
          </div>
        `
        )
        .join("")}
    </body>
    </html>
  `;

  const blob = new Blob([htmlContent], { type: "application/msword" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `ATM_Тайлан_${new Date().toISOString().split("T")[0]}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
    }