const fileReader = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve(reader.result);
    };

    reader.onerror = () => {
      reject(reader.error);
      reader.abort();
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  });

export default fileReader;
