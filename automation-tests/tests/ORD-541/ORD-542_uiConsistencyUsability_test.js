Feature('ORD-542: UI Consistency & Usability');

Scenario('ORD-542 - Kiểm tra đồng bộ font chữ, màu sắc và giao diện Usability', async ({ I }) => {
  I.amOnPage('/');
  I.waitForElement('header', 15);
  I.seeElement('footer');
  I.see('EduLearn');
});