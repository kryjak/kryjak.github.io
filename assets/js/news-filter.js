(function () {
  var root = document.getElementById("news-page");
  if (!root) return;

  var items = root.querySelectorAll(".news-list__item");
  var dividers = root.querySelectorAll(".career-divider");
  var status = document.getElementById("news-filter-status");
  var label = document.getElementById("news-filter-label");
  var clearBtn = document.getElementById("news-filter-clear");
  var activeTag = null;

  function itemHasTag(item, tag) {
    var tags = (item.getAttribute("data-tags") || "").trim().split(/\s+/);
    return tags.indexOf(tag) !== -1;
  }

  function setFilter(tag) {
    activeTag = tag;

    items.forEach(function (item) {
      item.hidden = tag ? !itemHasTag(item, tag) : false;
    });

    dividers.forEach(function (divider) {
      divider.hidden = !!tag;
    });

    root.querySelectorAll(".news-tag").forEach(function (btn) {
      var isActive = btn.getAttribute("data-tag") === tag;
      btn.setAttribute("aria-pressed", isActive ? "true" : "false");
      btn.classList.toggle("news-tag--active", isActive);
    });

    if (status) {
      status.hidden = !tag;
      status.classList.toggle("is-active", !!tag);
    }
    if (label) {
      label.textContent = tag || "";
    }
  }

  root.addEventListener("click", function (event) {
    var btn = event.target.closest(".news-tag");
    if (!btn) return;

    event.preventDefault();
    var tag = btn.getAttribute("data-tag");
    setFilter(activeTag === tag ? null : tag);
  });

  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      setFilter(null);
    });
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && activeTag) {
      setFilter(null);
    }
  });
})();
