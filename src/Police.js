export default class Police {
	static main(styles) {
		var card = document.querySelector(".card");
		const container = card.parentNode;
		card.remove();
		var styleElement = document.head.appendChild(document.createElement("style"));
		let imports = Object.entries(styles).map(([id, style]) => this.at_import(style.folder, id));
		styleElement.innerHTML = imports.join("\n");

		for (let id in styles) {
			let style = styles[id];
			style.id = id;
			var fieldset = this.html_fieldset(style);
			var div = card.cloneNode(true);
			fieldset.appendChild(div);
			container.appendChild(fieldset);
		}
	}
	static at_import(...args) {
		args = args.filter(arg => arg);
		return `@import url('${args.join("/")}.css');`;
	}
	static html_fieldset(style) {
		const fieldset = document.createElement("fieldset");
		fieldset.classList.add("card");
		['body', 'heading', 'subheading'].forEach(prop => {
			fieldset.style.setProperty(`--font-${prop}`, style[prop]);
		});
		const legend = fieldset.appendChild(document.createElement("legend"));
		legend.innerHTML = style.label;
		legend.appendChild(this.html_button(style));
		return fieldset;
	}
	static html_button(style) {
		const button = document.createElement("button");
		button.title = "Copier @import";
		button.innerHTML = "📋&#xFE0E;";
		const imp = this.at_import('polices', style.folder, style.id);
		button.onclick = () => navigator.clipboard.writeText(imp);
		return button;
	}
}

