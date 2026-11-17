const sections = [
  ["start", "Quick start"],
  ["install", "Install the SDK"],
  ["formats", "Ad formats"],
  ["api", "API reference"],
  ["auth", "API authentication"],
  ["lifecycle", "Website approval"],
  ["security", "Security & privacy"],
  ["troubleshoot", "Troubleshooting"],
];
const sdk = '<script async src="https://cdn-ads.virtunumber.online/sdk.js" data-website-id="YOUR_WEBSITE_ID" data-zone-id="YOUR_ZONE_ID"></script>';
const serve = 'GET https://api-ads.virtunumber.online/v1/ads/serve?websiteId=WEB_ID&zoneId=ZONE_ID';
const summary = 'GET https://api-ads.virtunumber.online/v1/publisher/summary\nAuthorization: Bearer YOUR_API_KEY';

export default function Docs() {
  return <main className="docs">
    <style>{`
      .docs{min-height:100vh;color:#edf3ff;background:radial-gradient(850px 520px at 75% -10%,#2858a844,transparent 65%),radial-gradient(700px 520px at 0 35%,#653a8c22,transparent 65%),#070b16;font-family:Arial,sans-serif}
      .docs *{box-sizing:border-box}.docs a{color:inherit;text-decoration:none}.docsbar{height:72px;border-bottom:1px solid #ffffff14;display:flex;align-items:center;justify-content:space-between;padding:0 max(24px,calc((100vw - 1240px)/2));position:sticky;top:0;background:#080e1ddd;backdrop-filter:blur(18px);z-index:10}
      .docsbrand{display:flex;align-items:center;gap:12px;font-weight:800;letter-spacing:.04em}.docslogo{width:36px;height:36px;border-radius:12px;display:grid;place-items:center;background:linear-gradient(135deg,#3987ff,#7955e9 65%,#2bd5dc);box-shadow:0 8px 24px #397dff44}
      .docsbarlinks{display:flex;gap:20px;color:#9eacc5;font-size:13px}.docsbarlinks a:hover,.docnav a:hover{color:#fff}
      .docsbody{max-width:1240px;margin:auto;padding:52px 24px 100px;display:grid;grid-template-columns:220px minmax(0,1fr);gap:56px}
      .docnav{position:sticky;top:100px;align-self:start;display:grid;gap:8px}.docnav small{color:#74839f;letter-spacing:.14em;font-size:10px;font-weight:800;margin:0 0 8px 10px}.docnav a{padding:10px 12px;border-radius:10px;color:#9cabc4;font-size:13px;border:1px solid transparent}.docnav a:first-of-type{background:#23477b55;border-color:#5792ed33;color:#eaf2ff}
      .docmain{min-width:0}.docpill{display:inline-flex;align-items:center;gap:8px;border:1px solid #4d8fff44;background:#142c4c88;color:#9dc5ff;border-radius:999px;padding:7px 11px;font-size:11px;font-weight:700;letter-spacing:.08em}
      .doctitle{font-size:clamp(38px,6vw,64px);line-height:1.02;letter-spacing:-.055em;margin:24px 0 16px;font-weight:850;max-width:820px}.doclead{font-size:17px;line-height:1.7;color:#9eacc4;max-width:760px}.docmeta{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0 34px}.docmeta span{font-size:11px;color:#91a2bd;border:1px solid #ffffff17;border-radius:9px;padding:8px 10px;background:#101a2b}
      .doccallout{padding:17px 19px;border:1px solid #397be655;border-radius:16px;background:linear-gradient(110deg,#12294b99,#11192a99);color:#c5d8f7;font-size:13px;line-height:1.7;margin:24px 0}
      .docsection{scroll-margin-top:100px;margin-top:58px}.docsection h2{font-size:25px;letter-spacing:-.03em;margin:0 0 12px}.docsection>p{color:#9eacc4;font-size:14px;line-height:1.8;margin:0 0 18px}.docstep{display:grid;grid-template-columns:34px 1fr;gap:14px;margin:22px 0}.docnum{width:32px;height:32px;border-radius:10px;background:#1b3760;border:1px solid #5389d455;display:grid;place-items:center;color:#a9ceff;font-size:12px;font-weight:800}.docstep h3,.doccard h3{font-size:14px;margin:3px 0 8px}.docstep p,.doccard p{font-size:13px;line-height:1.7;color:#9eacc4;margin:0}
      .doccode{position:relative;white-space:pre-wrap;overflow-wrap:anywhere;background:#050a13;border:1px solid #ffffff18;border-radius:13px;padding:18px;color:#8fe2ef;font:12px/1.8 ui-monospace,SFMono-Regular,monospace;margin:14px 0}.docgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:13px}.doccard{background:linear-gradient(145deg,#17243bd9,#0d1526d9);border:1px solid #ffffff15;border-radius:16px;padding:18px}.doctablewrap{overflow:auto;border:1px solid #ffffff16;border-radius:14px;margin:18px 0}.doctable{width:100%;border-collapse:collapse;min-width:540px;font-size:12px}.doctable th{text-align:left;color:#8192af;background:#101a2b;padding:13px}.doctable td{padding:14px;border-top:1px solid #ffffff10;color:#bdc9dc;vertical-align:top;line-height:1.6}.doctable code{color:#8fe2ef}.docbadge{display:inline-block;border-radius:7px;padding:4px 7px;background:#1d3d35;color:#8ce4bd;font-size:10px;font-weight:800}.docfoot{border-top:1px solid #ffffff14;margin-top:70px;padding-top:24px;color:#7f8ea8;font-size:12px;line-height:1.8}
      @media(max-width:800px){.docsbody{grid-template-columns:1fr;gap:30px;padding:34px 18px 70px}.docnav{position:static;display:flex;overflow:auto;white-space:nowrap;padding-bottom:5px}.docnav small{display:none}.docnav a{flex:none}.docsbar{padding:0 18px}.docsbarlinks{gap:12px}.docsbarlinks a:nth-child(2){display:none}.docgrid{grid-template-columns:1fr}.docsection{margin-top:44px}}
    `}</style>
    <header className="docsbar"><a className="docsbrand" href="/docs"><span className="docslogo">N</span><span>NUMELIXA <span style={{color:"#75aaff"}}>ADS</span></span></a><nav className="docsbarlinks"><a href="#start">Documentation</a><a href="#api">API reference</a><a href="https://publisher.virtunumber.online">Publisher portal ↗</a></nav></header>
    <div className="docsbody">
      <aside className="docnav"><small>DOCUMENTATION</small>{sections.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</aside>
      <article className="docmain">
        <section id="start">
          <span className="docpill">DEVELOPER CENTER · PUBLISHER GUIDE</span>
          <h1 className="doctitle">One integration.<br/><span style={{background:"linear-gradient(90deg,#8abaff,#b49bff,#6fe2e5)",backgroundClip:"text",color:"transparent"}}>Your site, connected.</span></h1>
          <p className="doclead">Integrate Numelixa-owned campaigns into a verified website with a lightweight SDK. You manage your website and placements; Numelixa administrators manage the advertising campaigns.</p>
          <div className="docmeta"><span>SDK · JavaScript</span><span>API · REST</span><span>Publisher access · API keys</span></div>
          <div className="doccallout"><strong>Platform model</strong><br/>Numelixa Ads is a publisher integration platform for Numelixa-owned advertisements. Advertiser self-service is not available. Campaigns are created and managed by authorized Numelixa administrators.</div>
        </section>
        <section className="docsection" id="install"><h2>Install the SDK</h2><p>After your website is approved, open <strong>Publisher dashboard → Websites → Ad zones</strong>. Copy the installation snippet shown for the exact website and zone. Do not reuse IDs from another website.</p>
          <div className="docstep"><span className="docnum">01</span><div><h3>Register your website</h3><p>Add the domain in the publisher portal. Use a domain you own or are authorized to manage.</p></div></div>
          <div className="docstep"><span className="docnum">02</span><div><h3>Verify ownership</h3><p>Complete one of the verification methods offered in the dashboard: DNS TXT, HTML file, or meta tag. Verification proves control of the domain; it does not automatically approve the site for ads.</p></div></div>
          <div className="docstep"><span className="docnum">03</span><div><h3>Place the zone snippet</h3><p>Add the exact snippet at the intended placement in your page template. Install it once per zone placement and keep the identifiers unchanged.</p></div></div>
          <pre className="doccode">{sdk}</pre>
          <div className="doccallout">The SDK requests an eligible campaign from the Numelixa Ads API. If the website is not approved, the zone is inactive, the visitor origin does not match the registered domain, or no campaign is eligible, no ad is rendered.</div>
        </section>
        <section className="docsection" id="formats"><h2>Ad formats</h2><p>Zones are created after website approval. Each zone has a format selected by the platform.</p><div className="docgrid">
          <div className="doccard"><h3>Floating video</h3><p>A compact, fixed-position mini-player with a close control. The frame is isolated from the publisher page.</p></div>
          <div className="doccard"><h3>In-article video</h3><p>A responsive video placement intended to sit within editorial content.</p></div>
          <div className="doccard"><h3>Native</h3><p>A responsive creative that follows the available placement width.</p></div>
          <div className="doccard"><h3>Banner</h3><p>A lightweight, responsive banner placement.</p></div>
          <div className="doccard"><h3>HTML5</h3><p>An HTML creative rendered inside a sandboxed iframe.</p></div>
        </div></section>
        <section className="docsection" id="api"><h2>API reference</h2><p>All public API requests use the API hostname. Responses are JSON unless otherwise noted.</p>
          <div className="doctablewrap"><table className="doctable"><thead><tr><th>Method</th><th>Endpoint</th><th>Authentication</th><th>Purpose</th></tr></thead><tbody>
            <tr><td><span className="docbadge">GET</span></td><td><code>/v1/ads/serve</code></td><td>Public, origin checked</td><td>Fetch an eligible ad for a website and zone.</td></tr>
            <tr><td><span className="docbadge">POST</span></td><td><code>/v1/ads/event</code></td><td>Public, rate limited</td><td>Submit an impression or click event. Client events are currently untrusted and excluded from valid statistics and revenue.</td></tr>
            <tr><td><span className="docbadge">GET</span></td><td><code>/v1/publisher/summary</code></td><td>Publisher API key</td><td>Return the authenticated publisher's websites, zones, and valid-event totals.</td></tr>
            <tr><td><span className="docbadge">GET</span></td><td><code>/</code></td><td>Public</td><td>API health endpoint; checks database connectivity.</td></tr>
          </tbody></table></div>
          <h3 style={{fontSize:14,margin:"24px 0 8px"}}>Serve an ad</h3><pre className="doccode">{serve}</pre><p>The request must include both identifiers. The API checks website approval, zone status, publisher ownership, campaign eligibility, and the requesting origin. A valid response may contain <code>ad</code>; otherwise it returns <code>{"{ ad: null }"}</code>.</p>
          <h3 style={{fontSize:14,margin:"24px 0 8px"}}>Publisher summary</h3><pre className="doccode">{summary}</pre><p>API keys are read-only and scoped to the publisher account. The current limit is 120 requests per minute per key. Create or revoke keys from the authenticated Developer Center. The raw key is shown only when created; store it securely.</p>
        </section>
        <section className="docsection" id="auth"><h2>API authentication</h2><p>Only the publisher summary endpoint requires a publisher API key. Use the Authorization header; never put a key in a URL, browser source, public repository, or ad snippet.</p><div className="doccard"><h3>Bearer token format</h3><pre className="doccode" style={{marginBottom:0}}>Authorization: Bearer YOUR_API_KEY</pre></div><p style={{marginTop:14}}>Keys are stored as hashes on the platform, are read-only (<code>publisher:read</code>), and can be revoked from your dashboard. If a key is exposed, revoke it and create a replacement.</p></section>
        <section className="docsection" id="lifecycle"><h2>Website approval lifecycle</h2><div className="doctablewrap"><table className="doctable"><thead><tr><th>State</th><th>Meaning</th><th>Next step</th></tr></thead><tbody>
          <tr><td>Pending verification</td><td>Domain ownership has not yet been confirmed.</td><td>Complete a verification method.</td></tr>
          <tr><td>Pending review</td><td>Ownership is verified and the site awaits administrator review.</td><td>Wait for the review result.</td></tr>
          <tr><td>Changes requested</td><td>An administrator needs updates before approval.</td><td>Make the requested changes and resubmit.</td></tr>
          <tr><td>Approved</td><td>The site is eligible for active zones and matching campaigns.</td><td>Install the zone snippet.</td></tr>
          <tr><td>Rejected</td><td>The site was not approved.</td><td>Review the dashboard decision before taking further action.</td></tr>
        </tbody></table></div></section>
        <section className="docsection" id="security"><h2>Security & privacy</h2><div className="docgrid">
          <div className="doccard"><h3>Isolated creative</h3><p>Ad creative is rendered in a sandboxed iframe to reduce access to the publisher page.</p></div>
          <div className="doccard"><h3>Origin checks</h3><p>Ad serving checks the request origin against the verified website domain.</p></div>
          <div className="doccard"><h3>Publisher ownership</h3><p>Website and zone records are tied to the publisher account that registered them.</p></div>
          <div className="doccard"><h3>Honest measurement</h3><p>Browser-submitted events are not treated as verified traffic. They do not generate earnings or valid performance totals.</p></div>
        </div><div className="doccallout"><strong>Important:</strong> Do not place passwords, OTP codes, session tokens, personal account data, or other sensitive information inside ad creative or installation markup. Never spoof website or zone identifiers.</div></section>
        <section className="docsection" id="troubleshoot"><h2>Troubleshooting</h2><div className="doctablewrap"><table className="doctable"><thead><tr><th>Response / symptom</th><th>What it means</th><th>What to check</th></tr></thead><tbody>
          <tr><td><code>401 UNAUTHENTICATED</code></td><td>No valid publisher session or API key.</td><td>Sign in again or create a new API key.</td></tr>
          <tr><td><code>403 FORBIDDEN</code></td><td>The operation requires a different role or scope.</td><td>Confirm publisher/admin permissions.</td></tr>
          <tr><td><code>404 NOT_FOUND</code></td><td>The requested resource is missing or not eligible.</td><td>Check website and zone IDs and their status.</td></tr>
          <tr><td><code>DOMAIN_ALREADY_REGISTERED</code></td><td>The domain is already registered.</td><td>Use the existing website record or contact an administrator.</td></tr>
          <tr><td><code>429 RATE_LIMITED</code></td><td>Too many requests in the current rate window.</td><td>Slow retries and respect the rate limit.</td></tr>
          <tr><td>No ad appears</td><td>No eligible campaign was returned.</td><td>Check approval, active zone, matching format, origin domain, and campaign schedule/targeting.</td></tr>
          <tr><td>API health returns 503</td><td>The API could not connect to the database.</td><td>Check the database service, connection URI, and network access.</td></tr>
        </tbody></table></div>
        <div className="doccallout">Publisher support: sign in to the <a href="https://publisher.virtunumber.online" style={{color:"#a9ceff",textDecoration:"underline"}}>Publisher Portal</a> and use the support channel provided there.</div></section>
        <footer className="docfoot">NUMELIXA ADS · DEVELOPER DOCUMENTATION<br/>Documentation describes the currently implemented integration surface. Analytics validation, earnings, withdrawals, and advertiser self-service are not enabled. Platform capabilities may change as the service evolves.</footer>
      </article>
    </div>
  </main>;
}
