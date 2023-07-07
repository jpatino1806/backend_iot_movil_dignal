provider "google" {
  project = var.project
  region  = var.region
}

resource "google_compute_firewall" "default" {
  name    = "web"
  network = "default"

  allow {
    protocol = "tcp"
    ports    = ["4000", "8080", "22", "1883", "18083"]
  }

  allow {
    protocol = "icmp"
  }

  source_ranges = ["0.0.0.0/0"]
  target_tags   = ["web"]
}

resource "google_compute_address" "static" {
  name       = "vm-public-address"
  project    = var.project
  region     = var.region
  depends_on = [google_compute_firewall.default]
}

resource "google_compute_instance" "default" {
  name                      = "dignal-iot-1"
  machine_type              = "e2-small"
  zone                      = "${var.region}-a"
  tags                      = ["ssh", "http-server", "web"]
  allow_stopping_for_update = "true"

  boot_disk {
    initialize_params {
      image = "ubuntu-os-cloud/ubuntu-1804-lts"
    }
  }

  network_interface {
    network = "default"
    access_config {
      nat_ip = google_compute_address.static.address
    }
  }

  provisioner "remote-exec" {
    connection {
      host        = google_compute_address.static.address
      type        = "ssh"
      user        = var.user
      timeout     = "500s"
      private_key = file(var.privatekeypath)
    }

    inline = [
      "sudo apt update",
      "sudo apt install curl mysql-server -y",
      "curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -",
      "sudo apt install -y nodejs",
      "sudo npm i -g pm2",
      "curl -s https://assets.emqx.com/scripts/install-emqx-deb.sh | sudo bash",
      "sudo apt install -y emqx",
      "sudo systemctl start emqx",
    ]
  }

  depends_on = [google_compute_firewall.default]

  metadata = {
    ssh-keys = "${var.user}:${file(var.publickeypath)}"
  }
}
