import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Terms = () => {
  const navigate = useNavigate();

  return (
    <>
      <Container sx={{ my: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 3,
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            backdropFilter: "blur(8px)",
            px: 3,
            py: 1.2,
            textTransform: "none",
            color: "text.primary",
            fontWeight: "medium",
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 1)",
              boxShadow: "0 12px 25px rgba(0,0,0,0.12)",
              transform: "translateY(-2px)",
            },
            transition: "all 0.25s ease-in-out",
          }}
        >
          Go Back
        </Button>
        <Card
          sx={{
            mt: 3,
            boxShadow: "0 6px 18px rgba(0,0,0,0.07)",
            borderRadius: 3,
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
                textAlign: "center",
              }}
            >
              Terms and Conditions
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                1. Acceptance of Terms
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to Sweekar (&quot;Sweekar,&quot; &quot;we,&quot;
                &quot;us,&quot; or &quot;our&quot;). These Terms and Conditions
                (&quot;Terms&quot;) govern your access to and use of our website
                (sweekarme.in), our mobile application (Gazra Mitra, if
                applicable), and all related services, features, content, and
                applications offered by us (collectively, the
                &quot;Services&quot;).
              </Typography>
              <Typography variant="body1" paragraph>
                By accessing or using our Services, you agree to be bound by
                these Terms and our Privacy Policy (which is incorporated herein
                by reference). If you do not agree to these Terms, you may not
                access or use our Services. We specifically serve the LGBTQAI+
                community and women, and by using our Services, you affirm that
                you understand and respect the inclusive nature of our platform.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                2. Description of Services
              </Typography>
              <Typography variant="body1" paragraph>
                Sweekar provides a platform to connect users with verified
                professionals offering services such as mental health support,
                medical consultations, legal aid, and placement services. We
                facilitate these connections but are not direct providers of
                these professional services unless explicitly stated.
              </Typography>
              <Typography variant="body1" paragraph>
                The professionals listed on our platform operate as independent
                practitioners. Sweekar endeavors to verify their credentials and
                commitment to inclusivity but does not guarantee the quality,
                suitability, or outcomes of the services provided by these
                professionals.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                3. User Accounts and Responsibilities
              </Typography>
              <Typography variant="body1" paragraph>
                To access certain features of our Services, you may need to
                register for an account. You agree to:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    Provide accurate, current, and complete information during
                    the registration process.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Maintain and promptly update your account information to
                    keep it accurate, current, and complete.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Maintain the security and confidentiality of your account
                    credentials and not share them with any third party.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Notify us immediately of any unauthorized use of your
                    account or any other breach of security.
                  </Typography>
                </li>
              </ul>
              <Typography variant="body1" paragraph>
                You are responsible for all activities that occur under your
                account, whether or not you have authorized such activities.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                4. User Conduct and Prohibited Activities
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to use the Services only for lawful purposes and in a
                manner that respects the rights and dignity of others,
                particularly within our target communities. You agree not to:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    Use the Services for any illegal or unauthorized purpose.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Engage in any activity that is harmful, fraudulent,
                    deceptive, threatening, harassing, defamatory, obscene,
                    discriminatory, or otherwise objectionable.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Violate the privacy or personal rights of others, including
                    collecting or sharing information about users without their
                    explicit consent.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Impersonate any person or entity, or falsely state or
                    otherwise misrepresent your affiliation with a person or
                    entity.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Interfere with or disrupt the integrity or performance of
                    the Services or the data contained therein.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Attempt to gain unauthorized access to the Services, other
                    user accounts, or our computer systems or networks.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Upload or transmit viruses, worms, or any other malicious
                    code.
                  </Typography>
                </li>
              </ul>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                5. Intellectual Property Rights
              </Typography>
              <Typography variant="body1" paragraph>
                All content, features, and functionality on the Services,
                including text, graphics, logos, icons, images, audio clips,
                video clips, data compilations, and software, are the exclusive
                property of Sweekar or its licensors and are protected by Indian
                and international copyright, trademark, patent, trade secret,
                and other intellectual property or proprietary rights laws.
              </Typography>
              <Typography variant="body1" paragraph>
                You are granted a limited, non-exclusive, non-transferable,
                revocable license to access and use the Services for your
                personal, non-commercial use, subject to these Terms. You may
                not reproduce, distribute, modify, create derivative works of,
                publicly display, publicly perform, republish, download, store,
                or transmit any of the material on our Services without our
                prior written consent.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                6. Confidentiality and Privacy
              </Typography>
              <Typography variant="body1" paragraph>
                Your privacy is critically important to us. Our collection and
                use of personal information in connection with the Services are
                described in our{" "}
                <Typography
                  component="a"
                  href="/privacy-policy"
                  color="primary"
                >
                  Privacy Policy
                </Typography>
                . By using our Services, you consent to the collection, use, and
                sharing of your information as set forth in our Privacy Policy,
                including the handling of Sensitive Personal Information with
                your explicit consent.
              </Typography>
              <Typography variant="body1" paragraph>
                Professionals listed on our platform are also bound by
                confidentiality obligations regarding the information you share
                with them during consultations.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                7. Disclaimers
              </Typography>
              <Typography variant="body1" paragraph>
                THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS
                AVAILABLE&quot; BASIS, WITHOUT ANY WARRANTIES OF ANY KIND,
                EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO
                WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE,
                NON-INFRINGEMENT, AND ANY WARRANTIES ARISING OUT OF COURSE OF
                DEALING OR USAGE OF TRADE.
              </Typography>
              <Typography variant="body1" paragraph>
                SWEEKAR DOES NOT WARRANT THAT THE SERVICES WILL BE
                UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER
                HARMFUL COMPONENTS.
              </Typography>
              <Typography variant="body1" paragraph>
                SWEEKAR IS A PLATFORM FOR CONNECTING USERS WITH PROFESSIONALS.
                WE DO NOT PROVIDE PROFESSIONAL ADVICE (MEDICAL, LEGAL,
                THERAPEUTIC, ETC.) DIRECTLY. ANY INFORMATION OR CONTENT PROVIDED
                THROUGH THE SERVICES IS FOR INFORMATIONAL PURPOSES ONLY AND
                SHOULD NOT BE CONSIDERED A SUBSTITUTE FOR PROFESSIONAL ADVICE
                FROM A QUALIFIED PROVIDER. YOU ARE SOLELY RESPONSIBLE FOR YOUR
                INTERACTIONS AND ENGAGEMENTS WITH PROFESSIONALS YOU CONNECT WITH
                THROUGH OUR SERVICES. WE DO NOT ENDORSE, GUARANTEE, OR ASSUME
                RESPONSIBILITY FOR THE ACCURACY, RELIABILITY, OR EFFICACY OF ANY
                ADVICE, TREATMENT, OR SERVICES PROVIDED BY THESE PROFESSIONALS.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                8. Limitation of Liability
              </Typography>
              <Typography variant="body1" paragraph>
                TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT
                SHALL SWEEKAR, ITS AFFILIATES, DIRECTORS, OFFICERS, EMPLOYEES,
                AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE,
                INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES,
                INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS,
                GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF
                OR RELATING TO THE USE OF, OR INABILITY TO USE, THE SERVICES.
              </Typography>
              <Typography variant="body1" paragraph>
                IN NO EVENT SHALL SWEEKAR&apos;S TOTAL AGGREGATE LIABILITY TO
                YOU FOR ALL DAMAGES, LOSSES, AND CAUSES OF ACTION (WHETHER IN
                CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE) EXCEED THE
                AMOUNT PAID BY YOU, IF ANY, FOR ACCESSING OR USING THE SERVICES
                OR ONE HUNDRED INDIAN RUPEES (INR 100.00), WHICHEVER IS GREATER.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                9. Indemnification
              </Typography>
              <Typography variant="body1" paragraph>
                You agree to defend, indemnify, and hold harmless Sweekar, its
                affiliates, licensors, and service providers, and its and their
                respective officers, directors, employees, contractors, agents,
                licensors, suppliers, successors, and assigns from and against
                any claims, liabilities, damages, judgments, awards, losses,
                costs, expenses, or fees (including reasonable attorneys&apos;
                fees) arising out of or relating to your violation of these
                Terms or your use of the Services, including, but not limited
                to, any use of the Services&apos; content, services, and
                products other than as expressly authorized in these Terms or
                your use of any information obtained from the Services.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                10. Third-Party Links and Services
              </Typography>
              <Typography variant="body1" paragraph>
                The Services may contain links to third-party websites or
                services that are not owned or controlled by Sweekar. We have no
                control over, and assume no responsibility for, the content,
                privacy policies, or practices of any third-party websites or
                services. You further acknowledge and agree that Sweekar shall
                not be responsible or liable, directly or indirectly, for any
                damage or loss caused or alleged to be caused by or in
                connection with the use of or reliance on any such content,
                goods, or services available on or through any such websites or
                services.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                11. Termination
              </Typography>
              <Typography variant="body1" paragraph>
                We may terminate or suspend your access to all or part of the
                Services, without prior notice or liability, for any reason
                whatsoever, including without limitation if you breach these
                Terms. Upon termination, your right to use the Services will
                immediately cease.
              </Typography>
              <Typography variant="body1" paragraph>
                All provisions of the Terms which by their nature should survive
                termination shall survive termination, including, without
                limitation, ownership provisions, warranty disclaimers,
                indemnity, and limitations of liability.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                12. Governing Law and Dispute Resolution
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms shall be governed and construed in accordance with
                the laws of India, without regard to its conflict of law
                provisions. The courts in Vadodara, Gujarat, India, shall have
                exclusive jurisdiction over any disputes arising out of or
                relating to these Terms or the Services.
              </Typography>
              <Typography variant="body1" paragraph>
                Any dispute arising out of or in connection with these Terms,
                including any question regarding its existence, validity, or
                termination, shall be referred to and finally resolved by
                arbitration in Vadodara, Gujarat, in accordance with the
                Arbitration and Conciliation Act, 1996, as amended from time to
                time. The arbitration shall be conducted by a sole arbitrator
                appointed by mutual consent. The language of the arbitration
                shall be English.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                13. Changes to Terms
              </Typography>
              <Typography variant="body1" paragraph>
                We reserve the right, at our sole discretion, to modify or
                replace these Terms at any time. If a revision is material, we
                will provide at least 30 days&apos; notice prior to any new
                terms taking effect. What constitutes a material change will be
                determined at our sole discretion.
              </Typography>
              <Typography variant="body1" paragraph>
                By continuing to access or use our Services after those
                revisions become effective, you agree to be bound by the revised
                terms. If you do not agree to the new terms, please stop using
                the Services.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                14. Entire Agreement
              </Typography>
              <Typography variant="body1" paragraph>
                These Terms and our Privacy Policy constitute the entire
                agreement between you and Sweekar regarding your use of the
                Services and supersede all prior and contemporaneous
                understandings, agreements, representations, and warranties,
                both written and oral, regarding the Services.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Terms;
