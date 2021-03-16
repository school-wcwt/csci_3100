<Nav variant="pills" class="navbar navbar-expand-md navbar-light bg-light fixed-top" activeKey="/home">
<h1 class={styles.bigblue}>Hello Car!</h1>
<a class="navbar-brand" href="">
<img src= {logo} height="60" width="150" alt="mATE." class=" float-left" id="icon">
</img>
</a>
<button class="navbar-toggler float-right" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
<span class="navbar-toggler-icon"></span>
</button>
<Nav  defaultActiveKey="link-1" >
<Nav.Item>

<Nav.Link  class= 'toggle-switch' className={styles.navbars} hoverStyle={{ color: 'purple' }} eventKey="link-1" data-toggle="pill">Active</Nav.Link>
</Nav.Item>
<Nav.Item>
<Nav.Link eventKey="link-2" data-toggle="pill">Option 2</Nav.Link>
</Nav.Item>
<Nav.Item>
<Nav.Link eventKey="link-3" data-toggle="pill">
Disabled
</Nav.Link>
</Nav.Item>
</Nav>



    <Nav.Item>
      <Nav.Link href="/home">Active</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav.Item>
  </Nav>
  <p className="text-center mt-4 mb-4">Or right-aligned</p>
  <Nav className="justify-content-end" activeKey="/home">
    <Nav.Item>
      <Nav.Link href="/home">Active</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-1">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="link-2">Link</Nav.Link>
    </Nav.Item>
    <Nav.Item>
      <Nav.Link eventKey="disabled" disabled>
        Disabled
      </Nav.Link>
    </Nav.Item>
  </Nav>