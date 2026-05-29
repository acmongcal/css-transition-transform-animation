( function() {
	const siteNavigation = document.getElementById( 'site-navigation' );

	// Return early if the navigation don't exist.
	if ( ! siteNavigation ) {
		return;
	}

	const button = siteNavigation.getElementsByTagName( 'button' )[ 0 ];

	// Return early if the button don't exist.
	if ( 'undefined' === typeof button ) {
		return;
	}

	const menu = siteNavigation.getElementsByTagName( 'ul' )[ 0 ];

	// Hide menu toggle button if menu is empty and return early.
	if ( 'undefined' === typeof menu ) {
		button.style.display = 'none';
		return;
	}

	if ( ! menu.classList.contains( 'nav-menu' ) ) {
		menu.classList.add( 'nav-menu' );
	}

	// Toggle the .toggled class and the aria-expanded value each time the button is clicked.
	button.addEventListener( 'click', function() {
		siteNavigation.classList.toggle( 'toggled' );

		if ( button.getAttribute( 'aria-expanded' ) === 'true' ) {
			button.setAttribute( 'aria-expanded', 'false' );
		} else {
			button.setAttribute( 'aria-expanded', 'true' );
		}
	} );

	// Remove the .toggled class and set aria-expanded to false when the user clicks outside the navigation.
	document.addEventListener( 'click', function( event ) {
		const isClickInside = siteNavigation.contains( event.target );

		if ( ! isClickInside ) {
			siteNavigation.classList.remove( 'toggled' );
			button.setAttribute( 'aria-expanded', 'false' );
		}
	} );

	// Get all the link elements within the menu.
	const links = menu.getElementsByTagName( 'a' );

	// Toggle focus each time a menu link is focused or blurred.
	for ( const link of links ) {
		link.addEventListener( 'focus', toggleFocus, true );
		link.addEventListener( 'blur', toggleFocus, true );
	}

	/**
	 * Sets or removes .focus class on an element.
	 */
	function toggleFocus() {
		if ( event.type === 'focus' || event.type === 'blur' ) {
			let self = this;
			// Move up through the ancestors of the current link until we hit .nav-menu.
			while ( ! self.classList.contains( 'nav-menu' ) ) {
				// On li elements toggle the class .focus.
				if ( 'li' === self.tagName.toLowerCase() ) {
					self.classList.toggle( 'focus' );
				}
				self = self.parentNode;
			}
		}

		if ( event.type === 'touchstart' ) {
			const menuItem = this.parentNode;
			event.preventDefault();
			for ( const link of menuItem.parentNode.children ) {
				if ( menuItem !== link ) {
					link.classList.remove( 'focus' );
				}
			}
			menuItem.classList.toggle( 'focus' );
		}
	}
}() );


const buttons = document.querySelectorAll(".nav-btn");

const sections = document.querySelectorAll(".content-section");

// Add click event listeners to each button to handle navigation  between sections    
buttons.forEach(function(button){ 
  button.addEventListener("click", function(){

      /* Remove active
         from buttons */
      buttons.forEach(function(btn){
        btn.classList.remove( "active");
        // remove the "active" class from all buttons to reset their state. The "active" class is typically defined in CSS to visually indicate which button is currently selected or active. By removing the "active" class from all buttons, we ensure that only the clicked button will be highlighted as active when it is clicked, providing clear visual feedback to the user about their current selection. This approach helps maintain a clean and intuitive user interface as they navigate through different sections of content.    
      });

      /* Hide all sections */
      sections.forEach(function(section){ 
        section.classList.remove("active");
        // remove the "active" class from all sections to hide them. The "active" class is typically defined in CSS to control the display property of the section, allowing it to be shown while hiding the other sections that do not have this class. By removing the "active" class from all sections, we ensure that only the relevant content will be displayed when a button is clicked, providing a clean and organized user experience as they navigate through different sections of content. 

      });

      /* Active button */
      button.classList.add("active");

      /* Get selected section */
      // The dataset property allows you to access custom data attributes defined in the HTML. In this case, we are using data-section to identify which content section should be displayed when a button is clicked. By retrieving the value of data-section, we can determine which section corresponds to the clicked button and display it accordingly. This approach provides a clean and efficient way to manage navigation between different sections of content based on user interaction with the buttons.  

      const sectionName = button.dataset.section;

      /* Show section */
      const activeSection = document.getElementById(sectionName);

        // add the "active" class to the selected section to make it visible. The "active" class is typically defined in CSS to control the display property of the section, allowing it to be shown while hiding the other sections that do not have this class. By adding the "active" class to the selected section, we ensure that only the relevant content is displayed to the user based on their interaction with the navigation buttons. 

      activeSection.classList.add("active");

    }
  );

});

