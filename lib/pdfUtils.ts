import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (element: HTMLElement) => {
  try {
    // First, apply print-specific styles
    const printStyle = document.createElement('style')
    printStyle.textContent = `
      @media print {
        body * {
          visibility: hidden;
        }
        .print-invoice, .print-invoice * {
          visibility: visible;
        }
        .print-invoice {
          position: absolute;
          left: 0;
          top: 0;
          width: 210mm;  /* A4 width */
          min-height: 297mm; /* A4 height */
          margin: 0;
          padding: 20mm !important;
          box-sizing: border-box;
        }
        .print-invoice img {
          width: 120px !important;
          height: 120px !important;
          object-fit: contain !important;
        }
      }
    `
    document.head.appendChild(printStyle)

    // Wait for images to load
    await new Promise((resolve) => {
      const images = element.getElementsByTagName('img')
      let loadedImages = 0
      const totalImages = images.length

      if (totalImages === 0) {
        resolve(true)
        return
      }

      for (let img of images) {
        if (img.complete) {
          loadedImages++
          if (loadedImages === totalImages) resolve(true)
        } else {
          img.onload = () => {
            loadedImages++
            if (loadedImages === totalImages) resolve(true)
          }
          img.onerror = () => {
            loadedImages++
            if (loadedImages === totalImages) resolve(true)
          }
        }
      }
    })

    // Create canvas with proper dimensions
    const canvas = await html2canvas(element, {
      scale: 2, // Higher scale for better quality
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      imageTimeout: 0, // Wait for images indefinitely
      onclone: (doc, clonedElement) => {
        // Apply specific styles to the cloned element
        clonedElement.style.width = '210mm'
        clonedElement.style.minHeight = '297mm'
        clonedElement.style.padding = '20mm'
        clonedElement.style.boxSizing = 'border-box'
        clonedElement.style.position = 'relative'
        clonedElement.style.backgroundColor = '#ffffff'
        
        // Ensure images maintain their dimensions
        const images = clonedElement.getElementsByTagName('img')
        for (let img of images) {
          img.style.width = '120px'
          img.style.height = '120px'
          img.style.objectFit = 'contain'
        }
      }
    })

    // Create PDF with A4 dimensions
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    })

    // Add the canvas as an image to the PDF
    const imgData = canvas.toDataURL('image/png', 1.0)
    pdf.addImage(imgData, 'PNG', 0, 0, 210, 297)

    // Save the PDF
    pdf.save('invoice.pdf')

    // Clean up
    document.head.removeChild(printStyle)
  } catch (error) {
    console.error('Error generating PDF:', error)
    throw error
  }
}
