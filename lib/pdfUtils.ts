import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export const generatePDF = async (element: HTMLElement) => {
  // Calculate the actual content height including padding
  const computedStyle = window.getComputedStyle(element)
  const height = element.offsetHeight +
    parseInt(computedStyle.paddingTop) +
    parseInt(computedStyle.paddingBottom)
  const width = element.offsetWidth +
    parseInt(computedStyle.paddingLeft) +
    parseInt(computedStyle.paddingRight)

  // Configure html2canvas with proper dimensions and scaling
  const canvas = await html2canvas(element, {
    scale: 2, // Higher scale for better quality
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    width: width,
    height: height,
    windowWidth: width,
    windowHeight: height,
    x: -parseInt(computedStyle.paddingLeft),
    y: -parseInt(computedStyle.paddingTop),
    scrollX: -window.scrollX,
    scrollY: -window.scrollY,
    onclone: (document, clonedElement) => {
      // Ensure the cloned element preserves padding
      clonedElement.style.padding = computedStyle.padding
      clonedElement.style.width = `${width}px`
      clonedElement.style.height = `${height}px`
      clonedElement.style.position = 'relative'
      clonedElement.style.top = '0'
      clonedElement.style.left = '0'
    }
  })

  // Create PDF with A4 dimensions
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true
  })

  // Calculate PDF dimensions while preserving aspect ratio
  const pdfWidth = pdf.internal.pageSize.getWidth()
  const pdfHeight = pdf.internal.pageSize.getHeight()
  const aspectRatio = canvas.width / canvas.height
  
  let finalWidth = pdfWidth
  let finalHeight = pdfWidth / aspectRatio

  // If height exceeds page, scale down proportionally
  if (finalHeight > pdfHeight) {
    finalHeight = pdfHeight
    finalWidth = pdfHeight * aspectRatio
  }

  // Center the content
  const xOffset = (pdfWidth - finalWidth) / 2
  const yOffset = (pdfHeight - finalHeight) / 2

  // Add the image with proper dimensions
  pdf.addImage(
    canvas.toDataURL('image/png', 1.0),
    'PNG',
    xOffset,
    yOffset,
    finalWidth,
    finalHeight,
    undefined,
    'FAST'
  )

  pdf.save('invoice.pdf')
}
