RTS TOURS & TRAVELS — FREE WEBSITE STARTER

Files:
- index.html: responsive one-page website with a flight reservation request form.
- README.txt: setup and publishing instructions.

IMPORTANT FIRST EDIT
1. Open index.html in a text editor.
2. Find: const BUSINESS_WHATSAPP_NUMBER = "REPLACE_WITH_YOUR_WHATSAPP_NUMBER";
3. Replace the placeholder with your WhatsApp Business number including country code, digits only.
   Example format: 919876543210 (do not use this example number).
4. Save the file.

FREE PUBLISHING OPTION: GITHUB PAGES
1. Create a free account at https://github.com/
2. Create a new public repository named rts-travels-website.
3. Upload index.html to the repository root.
4. Open repository Settings > Pages.
5. Under Build and deployment, choose Deploy from a branch.
6. Select branch main and folder /(root), then Save.
7. GitHub will provide your free website address after deployment.

LIMITATIONS OF THIS FREE FIRST VERSION
- The form sends the order details to your WhatsApp number; it does not store orders in a database.
- It does not collect or verify payment automatically.
- For UPI, share your verified business UPI ID or QR with the customer after confirming the order. Do not put private banking credentials in the website.
- Do not collect passport scans or unnecessary sensitive data through this basic form.
- A WhatsApp message is opened for the customer to send; it is not silently sent automatically.
- Before launch, add your business contact details, privacy notice, terms, cancellation/refund policy and accurate description of the reservation service.
- Only provide genuine reservations from an authorised source, and clearly state whether a document is a reservation or an issued ticket.

This is a starter website, not a live booking engine or payment gateway.


PASSENGER PAGE UPDATE
- Number of Pax controls how many passenger sections appear (1 to 10).
- Each passenger can choose passport photo upload OR manual details.
- Photo input accepts JPG/JPEG/PNG only and rejects files >= 1 MB.
- Important: this static free starter only previews selected photos in the browser. It does not upload passport photos to WhatsApp or store them on a server. A secure backend/file-storage service and privacy controls are required before collecting passport images from real customers.


PASSENGER TYPES
- Number of Pax is split into Adult (12+ years), Child (2–11 years), and Infant (under 2 years).
- Passenger details sections are generated separately for each selected passenger type.
- Age classification is indicative; airlines apply their own age rules, normally based on age on the date of travel.
