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

const Privacy = () => {
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
              Privacy Policy
            </Typography>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                1. Introduction
              </Typography>
              <Typography variant="body1" paragraph>
                Welcome to Sweekar (&quot;we,&quot; &quot;us,&quot;
                &quot;our&quot;). We are committed to protecting your privacy
                and handling your personal information with transparency and
                care. This Privacy Policy outlines how we collect, use,
                disclose, and safeguard your information when you visit our
                website (sweekarme.in), use our mobile application (Gazra Mitra,
                if applicable and data is shared), or engage with our services
                (collectively, the &quot;Services&quot;).
              </Typography>
              <Typography variant="body1" paragraph>
                Our Services are designed to provide safe and inclusive
                professional support, particularly for the LGBTQAI+ community
                and women. We understand the sensitivity of the information you
                may share and are dedicated to maintaining its confidentiality.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                2. Information We Collect
              </Typography>
              <Typography variant="body1" paragraph>
                We may collect the following types of information:
              </Typography>
              <ul>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Personal Identification Information (PII):
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    This includes your name, email address, phone number, date
                    of birth, and other similar identifiers you provide when
                    registering, booking a consultation, filling out forms, or
                    contacting us.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Sensitive Personal Information (SPI):
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    Given the nature of our Services (mental health, medical,
                    legal aid), we may collect SPI such as information related
                    to your health conditions, mental well-being, sexual
                    orientation, gender identity, or legal circumstances. We
                    will only collect SPI with your explicit consent and for the
                    specific purpose of delivering the requested Services. You
                    have the right to withdraw this consent at any time.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Non-Personal Identification Information:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    This includes your browser type, operating system, Internet
                    Service Provider (ISP), IP address (anonymized where
                    possible), and website usage patterns (e.g., pages visited,
                    time spent on pages). This information is typically
                    collected automatically through server logs and analytics
                    tools.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Cookies and Tracking Technologies:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    We may use cookies, web beacons, and similar technologies to
                    enhance your experience, remember your preferences, and
                    gather analytics data. You can control cookie settings
                    through your browser.
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
                3. How We Use Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We use the collected information for the following purposes:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    To provide, operate, and maintain our Services, including
                    facilitating consultations with professionals.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To personalize your experience and tailor content and
                    services to your needs.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To process transactions and manage bookings.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To communicate with you, respond to your inquiries, and send
                    important notices or service-related updates.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To improve our platform, Services, and user experience based
                    on feedback and usage patterns.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    For research and analysis, using anonymized and aggregated
                    data, to better understand community needs and improve
                    service offerings.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To ensure the security of our platform and to prevent fraud
                    or abuse.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    To comply with applicable legal and regulatory obligations.
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
                4. How We Protect Your Information
              </Typography>
              <Typography variant="body1" paragraph>
                We are committed to protecting your information. We implement a
                variety of security measures, including:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    Data encryption (e.g., SSL/TLS) for information transmitted
                    online.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Secure server infrastructure and access controls to prevent
                    unauthorized access.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Regular security assessments and updates to our systems.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    Confidentiality agreements with our staff and listed
                    professionals who may have access to your information.
                  </Typography>
                </li>
              </ul>
              <Typography variant="body1" paragraph>
                While we strive to use commercially acceptable means to protect
                your Personal Information, no method of transmission over the
                Internet or method of electronic storage is 100% secure.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                5. Sharing Your Personal Information
              </Typography>
              <Typography variant="body1" paragraph>
                We do not sell, trade, or rent your PII to third parties for
                their marketing purposes. We may share your information in the
                following circumstances:
              </Typography>
              <ul>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    With Service Providers (Professionals):
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    We share your information with the verified professionals
                    (therapists, doctors, lawyers, etc.) listed on our platform
                    only when you book a consultation or request a service from
                    them. This sharing is based on your explicit consent and is
                    solely for the purpose of enabling them to provide you with
                    the requested service. These professionals are bound by
                    confidentiality obligations.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    With Third-Party Vendors:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    We may engage trusted third-party companies and individuals
                    to perform services on our behalf (e.g., payment processing,
                    data analytics, hosting services, customer support). These
                    vendors will only have access to your information to perform
                    these tasks and are obligated not to disclose or use it for
                    any other purpose.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    For Legal Reasons:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    We may disclose your information if required to do so by law
                    or in response to valid requests by public authorities
                    (e.g., a court or a government agency), or to protect the
                    rights, property, or safety of Sweekar, our users, or the
                    public.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Aggregated or Anonymized Data:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    We may share aggregated or anonymized information that does
                    not directly identify you with partners for research,
                    analysis, or service improvement.
                  </Typography>
                </li>
                <li>
                  <Typography
                    variant="body1"
                    component="span"
                    sx={{ fontWeight: "medium" }}
                  >
                    Business Transfers:
                  </Typography>
                  <Typography variant="body1" component="span">
                    {" "}
                    In the event of a merger, acquisition, reorganization, or
                    sale of assets, your information may be transferred as part
                    of that transaction. We will notify you of any such change
                    in ownership or control of your personal information.
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
                6. Your Rights and Choices
              </Typography>
              <Typography variant="body1" paragraph>
                You have certain rights regarding your personal information:
              </Typography>
              <ul>
                <li>
                  <Typography variant="body1">
                    <strong>Access:</strong> You can request access to the
                    personal information we hold about you.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Correction:</strong> You can request to correct or
                    update any inaccurate or incomplete personal information.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Deletion:</strong> You can request the deletion of
                    your personal information, subject to certain legal and
                    contractual restrictions.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Withdraw Consent:</strong> Where we process your
                    information based on consent (especially SPI), you have the
                    right to withdraw your consent at any time.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Data Portability:</strong> You may have the right to
                    request a copy of your data in a machine-readable format.
                  </Typography>
                </li>
                <li>
                  <Typography variant="body1">
                    <strong>Opt-out:</strong> You can opt-out of receiving
                    promotional communications from us by following the
                    unsubscribe instructions in those communications or by
                    contacting us directly.
                  </Typography>
                </li>
              </ul>
              <Typography variant="body1" paragraph>
                To exercise these rights, please contact us using the details
                provided below.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                7. Data Retention
              </Typography>
              <Typography variant="body1" paragraph>
                We will retain your personal information only for as long as is
                necessary for the purposes set out in this Privacy Policy,
                including for the purposes of satisfying any legal, accounting,
                or reporting requirements. For SPI, retention periods will be
                strictly limited to what is necessary for service provision or
                as required by professional ethical guidelines and applicable
                law.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                8. Third-Party Websites and Services
              </Typography>
              <Typography variant="body1" paragraph>
                Our Services may contain links to other websites or services
                that are not operated by us. If you click on a third-party link,
                you will be directed to that third party&apos;s site. We
                strongly advise you to review the Privacy Policy of every site
                you visit. We have no control over and assume no responsibility
                for the content, privacy policies, or practices of any
                third-party sites or services.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                9. Children&apos;s Privacy
              </Typography>
              <Typography variant="body1" paragraph>
                Our Services are not intended for individuals under the age of
                18 (or the relevant age of majority in their jurisdiction). We
                do not knowingly collect personal information from children. If
                we become aware that we have collected personal information from
                a child without verification of parental consent, we will take
                steps to remove that information from our servers.
              </Typography>
            </Box>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h6"
                component="h2"
                gutterBottom
                sx={{ fontWeight: "medium" }}
              >
                10. Changes to This Privacy Policy
              </Typography>
              <Typography variant="body1" paragraph>
                We may update our Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the &quot;Last Updated&quot; date. We
                encourage you to review this Privacy Policy periodically for any
                changes. Changes to this Privacy Policy are effective when they
                are posted on this page.
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  );
};

export default Privacy;
