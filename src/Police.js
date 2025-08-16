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
	static url(...args) {
		let dossier = location.pathname.split("/").slice(0, -1).join("/");
		args.unshift(dossier);
		return location.origin + '/' + args.filter(arg => arg).join("/") + ".css";
	}
	static at_import(...args) {
		return `@import url('${this.url(...args)}');`;
	}
	static html_fieldset(style) {
		const fieldset = document.createElement("fieldset");
		fieldset.classList.add("card");
		['body', 'heading', 'subheading'].forEach(prop => {
			fieldset.style.setProperty(`--font-${prop}`, style[prop]);
		});
		const legend = fieldset.appendChild(document.createElement("legend"));
		const label = document.createElement("span");
		label.innerHTML = style.label;
		legend.appendChild(label);
		legend.appendChild(this.html_button(style));
		legend.appendChild(this.html_link_download(style));
		return fieldset;
	}
	static html_button(style) {
		const button = document.createElement("button");
		button.title = "Copier @import";
		button.innerHTML = "📋&#xFE0E;";
		const imp = this.at_import(style.folder, style.id);

		button.onclick = () => navigator.clipboard.writeText(imp);
		return button;
	}
	static html_link_download(style) {
		const link = document.createElement("a");
		link.title = "Télécharger";
		link.innerHTML = "📥&#xFE0E;";
		link.href = this.url(style.folder, style.id);
		link.download = style.id + ".css";
		return link;
	}
}

