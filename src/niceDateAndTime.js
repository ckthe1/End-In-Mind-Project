let options = {
	weekday: "long",
	month: "long",
	day: "numeric",
	hour: 'numeric',
	minute: 'numeric',
};
  
/** Takes in a raw date string and returns a nicely formatted date string. */
function renderDate(dateString) {
	if (dateString === null || dateString === "") {
		return "";
	}

	let newDate = new Date(dateString);
	return newDate.toLocaleDateString("en-US", options);
}

export default renderDate;