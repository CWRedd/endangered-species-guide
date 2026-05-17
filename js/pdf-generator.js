// Simple PDF generation library using canvas and html2pdf

function downloadSpeciesPDF(speciesName, data) {
  // Check if html2pdf library is available
  if (typeof html2pdf === 'undefined') {
    // Load the library dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => createPDF(speciesName, data);
    document.head.appendChild(script);
  } else {
    createPDF(speciesName, data);
  }
}

function createPDF(speciesName, data) {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 800px;">
      <h1>${speciesName}</h1>
      <p><em>${data.scientific}</em></p>
      
      <h2>Classification</h2>
      <p><strong>Type:</strong> ${data.type}</p>
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Habitat:</strong> ${data.habitat}</p>
      
      <h2>Description</h2>
      <p>${data.description}</p>
      
      <h2>Ecological Role</h2>
      <p>${data.ecological}</p>
      
      <h2>Key Identification Features</h2>
      <ul>
        ${data.features.map(f => `<li>${f}</li>`).join('')}
      </ul>
      
      <h2>Geographic Distribution</h2>
      <p>${data.distribution}</p>
      
      <h2>Conservation Status</h2>
      <p>${data.conservation}</p>
      
      <h2>Additional Resources</h2>
      <p>iNaturalist: ${data.inaturalist}</p>
      <p>Georgia Wildlife: www.georgiawildlife.com</p>
      
      <p style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        Generated from Georgia Wildlife Species Guide - ${new Date().toLocaleDateString()}
      </p>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: `${speciesName.replace(/\s+/g, '_')}_guide.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  
  html2pdf().set(opt).from(element).save();
}

// Function to download identification checklist PDF
function downloadIdentificationChecklist() {
  if (typeof html2pdf === 'undefined') {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => createChecklistPDF();
    document.head.appendChild(script);
  } else {
    createChecklistPDF();
  }
}

function createChecklistPDF() {
  const element = document.createElement('div');
  element.innerHTML = `
    <div style="font-family: Arial, sans-serif; padding: 20px;">
      <h1>Georgia Wildlife Species - Field Identification Checklist</h1>
      
      <h2>Before You Go Out</h2>
      <div>
        <input type="checkbox"> Check weather conditions
        <input type="checkbox"> Bring binoculars and camera
        <input type="checkbox"> Wear appropriate clothing
        <input type="checkbox"> Have water and sun protection
      </div>
      
      <h2>When You Find a Species</h2>
      <div>
        <input type="checkbox"> Record the date and time
        <input type="checkbox"> Note the location (GPS if possible)
        <input type="checkbox"> Record habitat type
        <input type="checkbox"> Take clear photos
        <input type="checkbox"> Note distinctive features
        <input type="checkbox"> Observe behavior
        <input type="checkbox"> Check for identifying marks
      </div>
      
      <h2>Native Species to Look For</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Eastern Box Turtle</strong></td>
          <td style="padding: 8px;">Terrapene carolina</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Black Bear</strong></td>
          <td style="padding: 8px;">Ursus americanus</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Red-tailed Hawk</strong></td>
          <td style="padding: 8px;">Buteo jamaicensis</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Southern Magnolia</strong></td>
          <td style="padding: 8px;">Magnolia grandiflora</td>
        </tr>
      </table>
      
      <h2>Invasive Species Warning</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Japanese Honeysuckle</strong></td>
          <td style="padding: 8px;">Lonicera japonica</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Kudzu</strong></td>
          <td style="padding: 8px;">Pueraria montana</td>
        </tr>
        <tr style="border-bottom: 1px solid #ddd;">
          <td style="padding: 8px;"><input type="checkbox"></td>
          <td style="padding: 8px;"><strong>Wild Boar</strong></td>
          <td style="padding: 8px;">Sus scrofa</td>
        </tr>
      </table>
      
      <h2>After You Return</h2>
      <div>
        <input type="checkbox"> Upload photos to iNaturalist
        <input type="checkbox"> Report invasive species to EDDMapS
        <input type="checkbox"> Include GPS location
        <input type="checkbox"> Add detailed description
      </div>
      
      <p style="margin-top: 40px; border-top: 1px solid #ddd; padding-top: 20px; font-size: 12px; color: #666;">
        Generated from Georgia Wildlife Species Guide - ${new Date().toLocaleDateString()}
      </p>
    </div>
  `;
  
  const opt = {
    margin: 10,
    filename: 'Georgia_Wildlife_Field_Checklist.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { orientation: 'portrait', unit: 'mm', format: 'a4' }
  };
  
  html2pdf().set(opt).from(element).save();
}
