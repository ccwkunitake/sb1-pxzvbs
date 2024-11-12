export const openYamatoTracking = (number: string): void => {
  // Create a hidden form and submit it
  const form = document.createElement('form') as HTMLFormElement;
  form.method = 'POST';
  form.action = 'https://toi.kuronekoyamato.co.jp/cgi-bin/tneko';
  form.target = '_blank';

  // Add tracking number input
  const numberInput = document.createElement('input');
  numberInput.type = 'hidden';
  numberInput.name = 'number01';
  numberInput.value = number;
  form.appendChild(numberInput);

  // Add required hidden fields
  const requiredFields = {
    'number02': '',
    'number03': '',
    'number04': '',
    'number05': '',
    'number06': '',
    'number07': '',
    'number08': '',
    'number09': '',
    'number10': '',
    'submit': '荷物お問い合わせ'
  };

  Object.entries(requiredFields).forEach(([name, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = name;
    input.value = value;
    form.appendChild(input);
  });

  // Append form to body, submit it, and remove it
  document.body.appendChild(form);
  
  // Create and click a submit button instead of using form.submit()
  const submitButton = document.createElement('input');
  submitButton.type = 'submit';
  submitButton.style.display = 'none';
  form.appendChild(submitButton);
  submitButton.click();
  
  // Clean up
  setTimeout(() => {
    document.body.removeChild(form);
  }, 100);
};

export const loadTrackingItems = () => {
  const saved = localStorage.getItem('trackingItems');
  return saved ? JSON.parse(saved) : [];
};

export const saveTrackingItems = (items: any[]) => {
  localStorage.setItem('trackingItems', JSON.stringify(items));
};