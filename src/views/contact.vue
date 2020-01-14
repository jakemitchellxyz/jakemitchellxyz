<template>
  <div class="page-padding animated">
    <div class="page">
      <div class="container">
        <div class="contact">
          <p class="h2 display-4 pb-5">Reach out to me, I'd love to have a conversation.</p>
          <form
            name="contact"
            method="POST"
            data-netlify="true"
            data-netlify-recaptcha="true"
          >
            <div class="form-section">
              <label class="form-group">
                <span>Name <span style="color: pink">*</span></span>
                <input
                  name="name"
                  type="text"
                  placeholder="Billy Pilgrim"
                  class="form-field"
                  required
                />
              </label>
              <label class="form-group">
                <span>Email <span style="color: pink">*</span></span>
                <input
                  name="email"
                  type="email"
                  placeholder="billy.pilgrim@dresden.com"
                  class="form-field"
                  required
                />
              </label>
              <label class="form-group">
                <span>Phone #</span>
                <input
                  name="phone"
                  type="tel"
                  placeholder="(555)555-1234"
                  class="form-field"
                />
              </label>
              <label class="form-group">
                <span>Company</span>
                <input
                  name="company"
                  type="text"
                  placeholder="Tralfamadore"
                  class="form-field"
                />
              </label>
            </div>
            <div class="form-section">
              <label>
                <p class="display-2 mb-3">How can I help you? <span style="color: red">*</span></p>
                <textarea
                  name="message"
                  placeholder="Poo-tee-weet?"
                  class="form-field"
                  required
                ></textarea>
              </label>
            </div>
            <div class="form-section submit-section">
              <div data-netlify-recaptcha="true"></div>
              <button class="submit" type="submit">Send <span class="ion-arrow-right-c"></span></button>
            </div>
          </form>
        </div>
      </div>

      <home-button />
    </div>
  </div>
</template>

<script>
import homeButton from '@/views/components/home-button.vue'

export default {
  name: 'contact',
  components: {
    'home-button': homeButton
  }
}
</script>
