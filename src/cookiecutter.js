
function init() {
	document.querySelector("[data-extract-button]").addEventListener("click", copyCurrentTabCookie);
}

function copyCurrentTabCookie() {
	chrome.tabs.query({active: true}, function(tabs) {
		if (!tabs.length) {
			showError("Couldn't get the current active tab.")
			return;
		}
		let tab = tabs[0];
		if (!tab.url) {
			showError("Couldn't get the URL of the current active tab.")
			return;
		}
		getCookieString(tab.url, function(cookieString) {
			navigator.clipboard.writeText(cookieString).then(function() {
				// Success
				showSuccess();
			}, function() {
				// Failure
				showError("Couldn't copy the cookie to your clipboard.")
			});
		});
	});
}

function getCookieString(url, callback) {
	chrome.cookies.getAll({url: url}, function(cookies) {
		callback(combineCookiesToString(cookies));
	});
}

function combineCookiesToString(cookies) {
	// Given an array of chrome.cookies.Cookie objects, return a single string for the `Cookie`
	// header.
	let keyValuePairStrings = [];
	cookies.forEach((cookie) => {
		keyValuePairStrings.push(cookie.name + "=" + cookie.value);
	});
	return keyValuePairStrings.join("; ");
}

function showError(text) {
	document.querySelectorAll("[data-status] *").forEach(el => el.classList.add("hidden"));
	const failureEl = document.querySelector("[data-status] [data-status-failure]")
	failureEl.innerText = text;
	failureEl.classList.remove("hidden");
}

function showSuccess() {
	document.querySelectorAll("[data-status] *").forEach(el => el.classList.add("hidden"));
	document.querySelector("[data-status] [data-status-success]").classList.remove("hidden");
}


init();
