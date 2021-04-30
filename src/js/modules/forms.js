export default class Form {
  constructor(url, forms) {
    this.url = url;
    this.forms = document.querySelectorAll(forms);
    this.inputs = document.querySelectorAll('input');
    this.message = {
      loading: 'Loading...',
      success: 'Thank you! We will contact you soon.',
      failure: 'Loading error. Try later.',
    };
  }

  clearInputs() {
    this.inputs.forEach(input => {
      input.value = '';
    });
  }

  checkMailInputs() {
    const mailInputs = document.querySelectorAll('[type="email"]');

    mailInputs.forEach(item => {
      item.addEventListener('keypress', function(evt) {
        if (evt.key.match(/[^a-z 0-9 @ \.]/ig)) {
          evt.preventDefault();
        }
      });

      item.addEventListener('input', () => {
        item.value = item.value.replace(/[^a-z 0-9 @ \.]/ig, '');
      });
    });
  }

  initMask() {
    let setCursorPosition = (pos, elem) => {
      elem.focus();

      if (elem.setSelectionRange) {
        elem.setSelectionRange(pos, pos);
      } else if (elem.createTextRange) {
        let range = elem.createTextRange();

        range.collapse(true);
        range.moveEnd('character, pos');
        range.moveStart('character, pos');
        range.select();
      }
    };

    function createMask(event) {
      let matrix = '+1 (___) ___-____',
          i = 0,
          def = matrix.replace(/\D/g, ''),
          val = this.value.replace(/\D/g, '');

      if (def.length >= val.length) {
        val = def;
      }

      this.value =matrix.replace(/./g, function(a) {
        return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
      });

      if (event.type === 'blur') {
        if (this.value.length == 2) {
          this.value = '';
        }
      } else {
        setCursorPosition(this.value.length, this);
      }
    }

    let inputs = document.querySelectorAll('[name="phone"]');

    inputs.forEach(item => {
      item.addEventListener('input', createMask);
      item.addEventListener('focus', createMask);
      item.addEventListener('blur', createMask);
    });
  }

  async postData(data) {
    let result = await fetch(this.url, {
      method: 'POST',
      body: data,
    });
    return await result.text();
  }

  init() {
    this.checkMailInputs();
    this.initMask();

    this.forms.forEach(form => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();

        let statusMessage = document.createElement('div');
        statusMessage.classList.add('policy');
        form.parentNode.appendChild(statusMessage);
        statusMessage.textContent = this.message.loading;

        const formData = new FormData(form);

        this.postData(formData)
          .then(result => {
            console.log(result);
            statusMessage.textContent = this.message.success;
          })
          .catch(() => {
            statusMessage.textContent = this.message.failure;
          })
          .finally(() => {
            this.clearInputs();
            setTimeout(() => {
              statusMessage.remove();
            }, 3000);
          });

      });
    });
  }

}