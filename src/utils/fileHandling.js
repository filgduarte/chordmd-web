import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

export function loadChordMDFile(setChordMD) {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = ".chordmd,text/plain";
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setChordMD(event.target.result);
    };
    reader.readAsText(file);
  };
  input.click();
}

export function saveChordMDFile(content, songTitle) {
    const filename = songTitle ? `${songTitle}.chordmd` : "untitled.chordmd";
    const blob = new Blob([content], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export function saveHTMLAsPDF(elementId, songTitle) {
    const input = document.getElementById(elementId);
    if (!input) {
        alert("Could not find the element to save as PDF.");
        return;
    }

    const temp = document.createElement("div");
    temp.style.position = "fixed";
    temp.style.left = "-9999px";
    temp.style.top = "0";
    temp.style.width = "210mm"; // A4 width
    temp.height = "297mm"; // A4 height
    temp.style.padding = "15mm 20mm";
    temp.style.background = "#fff";
    temp.innerHTML = input.innerHTML;
    document.body.appendChild(temp);

    const filename = songTitle ? `${songTitle}.pdf` : "untitled.pdf";

    html2canvas(temp).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "pt",
            format: "a4"
        });
        const imgProps = pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        pdf.save(filename);
        
        document.body.removeChild(temp);
    });
}