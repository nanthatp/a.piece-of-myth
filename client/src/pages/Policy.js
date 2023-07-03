import React from "react";
import Layout from "./../components/Layout/Layout";
import {MdPolicy} from "react-icons/md";

const Policy = () => {
  return (
    <Layout title = {"Privacy Policy"}>
      <div className="row contactus ">
        {/* <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="policy"
            style={{ width: "100%" }}
          />
        </div> */}
        <h1 className="policy">
          <MdPolicy/> Privacy Policy
        </h1>
        <div className="policy-text">
          <h5>1.Information Collected</h5>
            <p>We collect personal information when you register with us and when you use our services. Personal information is information about you that is personally identifiable like your name, postal address, email address, or phone number, and that is not otherwise publicly available. When you create a Lalapix account we ask for information such as your name and email address. When you place an order we ask for a phone number, billing and shipping address, and billing information. By accessing Lalapix via a Third Party Platform, you authorise Lalapix to receive certain of your personal information that is available on or through your Third Party Platform account, including, without limitation, your profile information, name, email address, gender, birthday, current city, friends or follower names, your photos, profile picture, privacy settings and certain other information that will be disclosed to you during the login process. We may also collect information through the use of cookies, web beacons and similar technologies and use third-party service providers that may use cookies, web beacons and similar technologies to help operate their services.</p>
          <h5>2.Use of Information</h5>
            <p>We use your personal information to fulfill your requests for products and services, to improve our services, to customise the advertising and content you see, to share with third parties pursuant to services that we offer to you and to contact you. We may also combine your personal information with publicly available information and information we receive from or cross-reference with our partners. By creating an account, purchasing our products or saving a design on the Website, you may be opted into receiving email messages. These messages could include changes to features of our service and additional email messages about our products, services, contests, and promotions that we feel may be of interest to you.</p>
          <h5>3.Cookies and Analytics</h5>
            <p>We use cookies and analytics technologies to gather usage and performance information about our web page. This information helps us analyze our website usage and web page performance.

                A cookie consists of information sent by a web server to a web browser and stored by the browser. The information is then sent back to the server each time the browser requests a page from the server. This enables the web server to identify and track the web browser.

                We may use both session cookies and persistent cookies on the website. We will use the session cookies to: keep track of you whilst you navigate the website. We will use the persistent cookies to: enable our website to recognize you when you visit.

                Session cookies will be deleted from your computer when you close your browser. Persistent cookies will remain stored on your computer until deleted, or until they reach a specified expiry date.

                We use Google Analytics to analyze the use of this website. Both Analytics tools generate statistical and other information about website use by means of cookies, which are stored on users' computers. The information generated relating to our website is used to create reports about the use of the website. Google will store this information; their privacy policy is available here.

                Most browsers allow you to reject all cookies, whilst some browsers allow you to reject just third-party cookies. For example, in Chrome you can refuse all cookies by clicking on your computer click More and then Settings, at the bottom, click Advanced, under "Privacy and security," click Content settings; click Cookies; from here, you can: turn on cookies: Next to "Blocked," turn on the switch; turn off cookies: Turn off Allow sites to save and read cookie data. Check the instructions here.

                Blocking all cookies will, however, have a negative impact upon the usability of many websites, including this one.</p>
          <h5>4.Updates to this Privacy Policy</h5>
            <p>We reserve the right to update or modify this Policy at any time without prior notice. For this reason, we encourage you to review this Policy whenever you purchase products from us or use the Website so that you may be informed of any updates.  Amendments to this Policy are effective immediately when posted on this Website. Your continued use of the Website after posting of amendments will be deemed your acceptance of the changes to this Policy.</p>
          <h5>5.Data deletion request instructions</h5>
            <p>In the case that you want to delete your accounts from our system, please sending a request email to apieceofmyth@gmail.com</p>
          <h5>6.Disclosures</h5>
            <p>We won't sell or rent information about you.

              We may disclose information about you to any of our employees, officers, agents, suppliers or subcontractors insofar as reasonably necessary for the purposes set out in this privacy policy. In addition, we may disclose information about you:

              - To the extent that we are required to do so by law

              - In connection with any legal proceedings or prospective legal proceedings

              - In order to establish, exercise or defend our legal rights

              Except as provided in this privacy policy, we will not provide your information to third parties.</p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;