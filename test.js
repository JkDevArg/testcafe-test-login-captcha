require('dotenv').config();
import { Selector } from 'testcafe';



fixture`Login with reCAPTCHA`
    .page('http://yoururl');

test('Login with reCAPTCHA', async t => {
    // Introduce credenciales
    await t.typeText('input[name="username"]', 'USERNAME');
    await t.typeText('input[name="password"]', 'PASSWORD');

    // Selector para encontrar el iframe basado en su atributo sandbox
    const iframeSelector = Selector('iframe').withAttribute('sandbox');

    // Se cambia el iframe del captcha
    await t.switchToIframe(iframeSelector);

    const checkboxSelector = Selector('.recaptcha-checkbox-checkmark');
    await t.expect(checkboxSelector.exists).ok('Checkbox del reCAPTCHA no encontrado');
    await t.click(checkboxSelector);

    // Se vuelve a la pagina inicial para terminar con el submit
    await t.switchToMainWindow();

    // Haz clic en el botón de submit
    await t.click('button[type="submit"]');
    await t.wait(1000);

    // Verificar que se haya iniciado sesión exitosamente
    const loggedInMessage = Selector('.welcome-message');
    await t.expect(loggedInMessage.exists).ok('Se esperaba que el usuario iniciara sesión correctamente');
});
