// credits to github/CeamKrier
import * as FileSaver from "file-saver";

export const saveSvg = (svgEl: HTMLElement, name: string) => {
  svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const svgBlob = new Blob([preface, svgData], {
    type: "image/svg+xml",
  });
  downloadResource(svgBlob, name);
};

// export const savePng = (
// 	svgEl: HTMLElement,
// 	name: string,
// 	scaleVector: number
// ) => {
// 	const canvas = document.createElement('canvas');
// 	canvas.width = svgEl.getBoundingClientRect().height * scaleVector;
// 	canvas.height = svgEl.getBoundingClientRect().height * scaleVector;
// 	/**
// 	 *  The css width/height being ignored by the safari browser
// 	 *  thus distorts the svg while drawing it
// 	 *  - @#%! wasted too much time to figure out that
// 	 */
// 	svgEl.setAttribute('width', `${canvas.width}`);
// 	svgEl.setAttribute('height', `${canvas.height}`);

// 	svgEl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');

// 	const svgData = svgEl.outerHTML;
// 	const preface = '<?xml version="1.0" standalone="no"?>\r\n';

// 	const canvasContext = canvas.getContext('2d');

// 	const DOMURL = window.self.URL || window.self.webkitURL || window.self;
// 	const image = new Image();
// 	const svgBlob = new Blob([preface, svgData], {
// 		type: 'image/svg+xml',
// 	});
// 	const url = DOMURL.createObjectURL(svgBlob);

// 	canvas.style.display = 'none';
// 	document.body.appendChild(canvas);

// 	image.onload = () => {
// 		if (!canvasContext) {
// 			return;
// 		}

// 		canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);

// 		DOMURL.revokeObjectURL(url);
// 		canvas.toBlob((pngBlob) => {
// 			pngBlob && downloadResource(pngBlob, name);
// 			document.body.removeChild(canvas);
// 		});
// 	};

// 	image.src = url;
// };

export const savePng = (
  svgEl: HTMLElement,
  name: string,
  scaleVector: number
) => {
  const canvas = document.createElement("canvas");
  const rect = svgEl.getBoundingClientRect();
  const svgWidth = rect.width;
  const svgHeight = rect.height;

  // Increase the resolution by scaling the width and height
  canvas.width = svgWidth * scaleVector;
  canvas.height = svgHeight * scaleVector;

  // Set the SVG width and height to the scaled dimensions
  svgEl.setAttribute("width", `${canvas.width}`);
  svgEl.setAttribute("height", `${canvas.height}`);
  svgEl.setAttribute("xmlns", "http://www.w3.org/2000/svg");

  const svgData = svgEl.outerHTML;
  const preface = '<?xml version="1.0" standalone="no"?>\r\n';
  const canvasContext = canvas.getContext("2d");

  const DOMURL = window.self.URL || window.self.webkitURL || window.self;
  const image = new Image();
  const svgBlob = new Blob([preface, svgData], { type: "image/svg+xml" });
  const url = DOMURL.createObjectURL(svgBlob);

  canvas.style.display = "none";
  document.body.appendChild(canvas);

  image.onload = () => {
    if (!canvasContext) return;

    // Draw the image on the canvas with the scaled dimensions
    canvasContext.drawImage(image, 0, 0, canvas.width, canvas.height);
    DOMURL.revokeObjectURL(url);

    canvas.toBlob(
      (pngBlob) => {
        if (pngBlob) downloadResource(pngBlob, name);
        document.body.removeChild(canvas);
      },
      "image/png",
      1.0
    ); // Ensure maximum quality for the PNG
  };

  image.src = url;
};

const downloadResource = (resource: Blob, name: string) => {
  FileSaver.saveAs(resource, name);
};
