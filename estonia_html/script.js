document.addEventListener('DOMContentLoaded', function() {
    fetch('data.csv')
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1).map(row => {
                const regex = /(".*?"|[^",\s]+)(?=\s*,|\s*$)/g;
                const matches = typeof row === 'string' ? row.match(regex) : null;
                return matches ? matches.map(field => field.replace(/^"|"$/g, '')) : [];
            }); // Skip header row and properly parse CSV
            const container = document.createElement('div');
            container.classList.add('container');
		
		
		function setBackgroundImageSafely(div, imagePath, fallbackPath) {
    const img = new Image();
    img.onload = () => {
        div.style.backgroundImage = `url(${imagePath})`;
    };
    img.onerror = () => {
        div.style.backgroundImage = `url(${fallbackPath})`;
    };
    img.src = imagePath;
}


            // Create the popup div once
            const popup = document.createElement('div');
            popup.classList.add('popup');

            const closeButton = document.createElement('div');
            closeButton.classList.add('close-button');
            closeButton.addEventListener('click', function() {
                popup.style.display = 'none';
            });
            popup.appendChild(closeButton);

            const popupContent = document.createElement('div');
            popupContent.classList.add('popup-content');
            popup.appendChild(popupContent);
		
		

            const popupGrayBox = document.createElement('div');
            popupGrayBox.classList.add('popup-gray-box');
            popupContent.appendChild(popupGrayBox);

            const popupTextContainer = document.createElement('div');
            popupTextContainer.classList.add('popup-text-container');
            popupContent.appendChild(popupTextContainer);

            const popupNameDiv = document.createElement('div');
            popupNameDiv.classList.add('popup-name-div');
            popupTextContainer.appendChild(popupNameDiv);

            const popupAmetDiv = document.createElement('div');
		 popupAmetDiv.classList.add('popup-amet-div');
            popupTextContainer.appendChild(popupAmetDiv);

            const popupDateDiv = document.createElement('div');
			popupDateDiv.classList.add('popup-date-div');
            popupTextContainer.appendChild(popupDateDiv);

            const cvDiv = document.createElement('div');
            cvDiv.classList.add('cv-div');
            popup.appendChild(cvDiv);

            // Add navigation arrows
            const leftArrow = document.createElement('div');
            leftArrow.classList.add('left-arrow');
            popup.appendChild(leftArrow);

            const rightArrow = document.createElement('div');
            rightArrow.classList.add('right-arrow');
            popup.appendChild(rightArrow);

            document.body.appendChild(popup);

            let currentIndex = 0;

   function updatePopup(index) {
    const row = rows[index];
    const eesnimi = row[0];
    const perekonnanimi = row[1];
    const amet = row[2];
    const date = row[4];
    const cv = row[5];

    popupNameDiv.textContent = `${eesnimi} ${perekonnanimi}`;
    popupAmetDiv.textContent = amet;
    popupDateDiv.textContent = date;
    cvDiv.textContent = cv;

const imageIndex = (index + 2).toString().padStart(3, '0');
const imagePath = `photos/${imageIndex}.jpg`;
setBackgroundImageSafely(popupGrayBox, imagePath, 'photos/error.jpg');



}


            leftArrow.addEventListener('click', function() {
                currentIndex = (currentIndex - 1 + rows.length) % rows.length;
                updatePopup(currentIndex);
            });

            rightArrow.addEventListener('click', function() {
                currentIndex = (currentIndex + 1) % rows.length;
                updatePopup(currentIndex);
            });

            rows.forEach((row, index) => {
                const columns = row;
                const eesnimi = columns[0];
                const perekonnanimi = columns[1];
                const amet = columns[2];
                const date = columns[4];
                const cv = columns[5];

                const itemDiv = document.createElement('div');
                itemDiv.classList.add('item-div');

const grayBox = document.createElement('div');
grayBox.classList.add('gray-box');
itemDiv.appendChild(grayBox);

const imageIndex = (index + 2).toString().padStart(3, '0');
const imagePath = `photos/${imageIndex}.jpg`;
setBackgroundImageSafely(grayBox, imagePath, 'photos/error.jpg');






                const textContainer = document.createElement('div');
                textContainer.classList.add('text-container');

                const nameDiv = document.createElement('div');
                 nameDiv.classList.add('nameDiv');           
                nameDiv.textContent = `${eesnimi} ${perekonnanimi}`;
                textContainer.appendChild(nameDiv);

                const ametDiv = document.createElement('div');
				ametDiv.classList.add('ametDiv');  
                ametDiv.textContent = amet;
                textContainer.appendChild(ametDiv);

                const dateDiv = document.createElement('div');
				dateDiv.classList.add('dateDiv');  
                dateDiv.textContent = date;
                textContainer.appendChild(dateDiv);

                itemDiv.appendChild(textContainer);
                container.appendChild(itemDiv);

                itemDiv.addEventListener('click', function() {
                    currentIndex = index;
                    updatePopup(currentIndex);
                    popup.style.display = 'flex';
                });
            });

            document.body.appendChild(container);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));


	
});
