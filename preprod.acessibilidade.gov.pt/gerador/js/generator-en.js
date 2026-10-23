/**
 * ACCESSIBILITY STATEMENT GENERATOR EN em PT
 * ---
 * [description]
 * ---
 */
(function () {
  'use strict';

  // Editable contents
  var DATA = {
    MONTH_NAMES: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ],
  };

  var isDateSupported = true;

  var fetchServer = "https://www.acessibilidade.gov.pt/serv/?url=";

  /**
   * statementForm module
   * ---
   * Helper module to read and write formdata
   * ---
   * @return {module} Module methods object; see method for description
   */
  var statementForm = (function () {
    'use strict';

    var _formData = new Map();

    var _formElement = document.forms.create_accessibility_statement_form;

    var _formState = new Map();
    _formState.set('changed', false);

    // Do initial form data storage (defaultvalues)
    function _init() {
      _today();
      // updateConformanceMeaning(); commented after removing content from the form

      Array.prototype.forEach.call(_formElement.elements, function setinitialData(item) {
        var nodeName = item.nodeName;
        var isProto = item.parentNode && item.parentNode.classList.contains('proto');

        if (['INPUT', 'TEXTAREA', 'SELECT'].indexOf(nodeName) !== -1 && !isProto) {
          _setFormData(item);
        }
      });
    }

    function _getData(identifier) {
      var data = {};

      if (identifier && typeof identifier === 'string') {
        return _formData.get(identifier);

      } else if (!identifier) {
        _formData.forEach(function returnData(value, key, map) {
          data[key] = value;
        });

        return data;
      }
    }

    function _today() {
      var monthnames = DATA.MONTH_NAMES;
      var dateToday = new Date();
      var day = dateToday.getDate();
      var month = dateToday.getMonth() + 1;
      var monthFull = monthnames[month - 1];
      var year = dateToday.getFullYear();
      var dateTodayString = '' + day + ' ' + monthFull + ' ' + year;
      var dates = document.querySelectorAll('#accstatement input.today');
      var i;

      for (i = 0; i < dates.length; i += 1) {
        try {
          dates[i].valueAsDate = dateToday;
          isDateSupported = true;
        } catch (e) {
          dates[i].value = dateTodayString;
          isDateSupported = false;
        }
      }
    }

    function _getFormGroup(groupName) {

      if (groupName) {
        return _formElement.elements[groupName];
      }
      return false;
    }

    function _getGroupValue(groupName) {
      var group = _getFormGroup(groupName) || [];
      var checkedMembers = Array.prototype.filter.call(group, function getChecked(member) {
        var isText = member.type !== 'radio'
          && member.type !== 'checkbox';

        return member.checked || (isText && member.value);
      });

      if (checkedMembers.length > 0) {
        return checkedMembers.map(function returnValue(member) {
          return member.value;
        });
      }

      return [];
    }

    /**
     * Transform input values into correct key value pairs
     * Set single string value or array of string values to key
     * @param       {HtmlFormElement} input
     */
    function _setFormData(input) {
      var inputName = input.name || undefined;
      var inputType = input.type || 'text';
      var inputValue;

      if (inputName && inputType !== 'radio') {
        inputValue = _getGroupValue(inputName) || [];
        _formData.set(inputName, inputValue);

      } else if (inputName && inputType === 'radio') {
        inputValue = _getGroupValue(inputName)[0] || '';
        _formData.set(inputName, inputValue);

      } else {
        // Single string values
        inputValue = input.value || '';
        _formData.set(input.id, inputValue);
      }
    }

    // Custom form data manipulation
    function updateConformanceMeaning() {
      var conformanceGroup = _formElement.elements.accstmnt_conformance;
      var activeConformance = Array.prototype.filter.call(conformanceGroup, function getChecked(item) {
        return item.checked;
      })[0];
      var meaningInput = _formElement.elements.accstmnt_conformance_meaning;
      var meaningElement = activeConformance.parentNode.querySelector('.meaning');
      var meaningValue = meaningElement && meaningElement.innerText || '';

      if (meaningInput.value !== meaningValue) {
        meaningInput.value = meaningValue;
        _setFormData(meaningInput);
      }
    }

    function resetOtherStandard() {
      var otherStandardInput = document.getElementById('accstmnt_standard_other_name');

      otherStandardInput.value = '';
      _setFormData(otherStandardInput);
    }

    /**
     * EXECUTE AREA
     */
    // Initiate statementForm
    _init();

    _formElement.addEventListener('change', function handleFormChange(event) {
      var formChanged = _formState.get('changed');
      var target = event.target;
      var allowedInputs = [
        'INPUT',
        'TEXTAREA',
        'SELECT'
      ];

      // Store formdata for changed input
      if (allowedInputs.indexOf(target.nodeName) !== -1 && target.id) {
        _setFormData(target);
      }

      if (!formChanged) {
        _formState.set('changed', true);
      }

      // Custom form manipulation
      // Setting conformance meaning
      if (target.name && target.name === 'accstmnt_conformance') {
        updateConformanceMeaning();
      }

      // (Re)Setting other standard applied
      if (
        target.name
        && target.name === 'accstmnt_standard'
        && target.id !== 'accstmnt_standard_other'
      ) {
        resetOtherStandard();
      }

      // Update name of entity on the form
      if (target.id && target.id === 'entity-gender') {
        Array.prototype.forEach.call(document.querySelectorAll("span.entity_article"), function updateArticle(el) {
          el.innerHTML = target.value.toLowerCase();
        });
      }
      if (target.id && target.id === 'entity-name') {
        Array.prototype.forEach.call(document.querySelectorAll("span.entity_description"), function updateName(el) {
          el.innerHTML = target.value;
        });
      }

      // Handle select box for type of target: website or app
      if (target.id && target.id === 'entity-target') {
        if (target.value === "website") {
          Array.prototype.forEach.call(document.querySelectorAll("span.entity-target-website"), function showWebsite(el) {
            el.removeAttribute('hidden');
          });
          Array.prototype.forEach.call(document.querySelectorAll("span.entity-target-app"), function hideApp(el) {
            el.setAttribute('hidden', '');
          });
        } else if (target.value === "app") {
          Array.prototype.forEach.call(document.querySelectorAll("span.entity-target-website"), function hideWebsite(el) {
            el.setAttribute('hidden', '');
          });
          Array.prototype.forEach.call(document.querySelectorAll("span.entity-target-app"), function showApp(el) {
            el.removeAttribute('hidden');
          });
        }
      }

      // Handle select box for conformance status
      if (target.id && target.id === 'conformance-status') {
        if (target.value === "full") {
          Array.prototype.forEach.call(document.getElementsByName('non-full-conformance'), function hideConformanceDetails(el) {
            el.setAttribute('hidden', '');
          });
        } else {
          Array.prototype.forEach.call(document.getElementsByName('non-full-conformance'), function hideConformanceDetails(el) {
            el.removeAttribute('hidden');
          });
        }
        Array.prototype.forEach.call(document.querySelectorAll("span.conformance-output"), function updateConformanceOutput(el) {
          if (target.value === "full") {
            el.innerHTML = "plenamente conforme";
          } else if (target.value === "partial") {
            el.innerHTML = "parcialmente conforme";
          } else if (target.value === "non") {
            el.innerHTML = "não conforme";
          }
        });
      }

      // Handle select box for automated assessment
      if (target.id && target.id === 'accstmnt_tools') {
        if (target.value === "yes") {
          Array.prototype.forEach.call(document.getElementsByName('with_tools'), function showWithTools(el) {
            el.removeAttribute('hidden');
          });
          Array.prototype.forEach.call(document.getElementsByName('without_tools'), function hideWithoutTools(el) {
            el.setAttribute('hidden', '');
          });
        } else if (target.value === "no") {
          Array.prototype.forEach.call(document.getElementsByName('without_tools'), function showWithoutTools(el) {
            el.removeAttribute('hidden');
          });
          Array.prototype.forEach.call(document.getElementsByName('with_tools'), function hideWithTools(el) {
            el.setAttribute('hidden', '');
          });
        }
      }

      // Handle select box for manual assessment
      if (target.id && target.id === 'accstmnt_manual') {
        if (target.value === "yes") {
          Array.prototype.forEach.call(document.getElementsByName('with_manual'), function showWithManual(el) {
            el.removeAttribute('hidden');
          });
          Array.prototype.forEach.call(document.getElementsByName('without_manual'), function hideWithoutManual(el) {
            el.setAttribute('hidden', '');
          });
        } else if (target.value === "no") {
          Array.prototype.forEach.call(document.getElementsByName('without_manual'), function showWithoutManual(el) {
            el.removeAttribute('hidden');
          });
          Array.prototype.forEach.call(document.getElementsByName('with_manual'), function hideWithManual(el) {
            el.setAttribute('hidden', '');
          });
        }
      }

      // Handle select box for assessment with users
      if (target.id && target.id === 'accstmnt_users') {
        if (target.value === "yes") {
          Array.prototype.forEach.call(document.getElementsByName('with_users'), function showWithUsers(el) {
            el.removeAttribute('hidden');
          });
        } else if (target.value === "no") {
          Array.prototype.forEach.call(document.getElementsByName('with_users'), function hideWithUsers(el) {
            el.setAttribute('hidden', '');
          });
        }
      }

    });

    return {
      data: {
        get: _getData,
        set: _formData.set,
      },
      element: _formElement,
      state: _formState,
      setFormData: _setFormData,
    };
  }());

  /**
   * Saver module to save data as file
   * @return {object} saver methods
   */
  var saver = (function () {
    'use strict';

    var DEFAULTS = {
      MIMETYPE: 'text/plain',
      ENCODING: 'utf-8',
      FILENAME: 'accessibility-statement',
      XMLNS: 'http://www.w3.org/1999/xhtml',
    };

    var MIME_TYPES = {
      // csv: 'text/csv',
      // tsv: 'text/tab-separated-values',
      json: 'application/json',
      text: 'text/plain',
      html: 'text/html',
    };

    function _saveAs(data, mime) {

      switch (mime) {
        case 'html':
          _saveAsHtml(data);
          break;

        default:
          _saveAsText(data);
      }
    }

    function _saveData(data, params) {
      params = params || {};

      var mime = MIME_TYPES[params.mime] || params.mime || DEFAULTS.MIMETYPE;

      // Create file
      var blob = _createBlob(data, mime, DEFAULTS.ENCODING);
      var blobUrl = _createBlobURL(blob);
      var date = new Date();
      var dateString = [
        date.getFullYear(),
        date.getMonth().toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1,
        date.getDate().toString().length === 1 ? '0' + date.getDate() : date.getDate(),
      ].join('-');
      var filename = DEFAULTS.FILENAME
        + '_' + dateString
        + '.' + params.mime;

      // Saving the blob
      _saveResource(
        blobUrl,
        {
          filename: filename,
          blob: blob,
          revoke: params.revoke || true
        }
      );
    }

    function _createBlob(data, mime, encoding) {
      var mimetype = MIME_TYPES[mime] || mime || DEFAULTS.MIMETYPE;
      encoding = encoding || DEFAULTS.ENCODING;

      return new Blob(
        [data],
        { type: mimetype + ';charset=' + encoding }
      );
    }

    function _createBlobURL(blob) {
      var oURL = URL.createObjectURL(blob);
      return oURL;
    };

    function _saveResource(href, params) {
      var a = document.createElementNS(DEFAULTS.XMLNS, 'a');
      var blob = params.blob;
      var filename = params.filename;

      // Directly save blob on IE or EDGE
      if (
        window.navigator
        && window.navigator.msSaveOrOpenBlob
        || window.navigator.msSaveBlob
      ) {
        try {
          window.navigator.msSaveOrOpenBlob(blob, filename);
        } catch (e) {
          window.navigator.msSaveBlob(blob, filename);
        }

      } else {
        a.href = href;
        a.setAttribute('download', params.filename || '');

        // Add, click and remove (download blob)
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      a = undefined;
      setTimeout(function () {
        URL.revokeObjectURL(href);
      }, 0);
    }

    function _saveAsText() {

    }

    function _saveAsHtml(data) {
      var mime = 'html';
      //var header = '<!DOCTYPE html>\n';

      _saveData(
        //header + data,
        data,
        {
          mime: mime,
        }
      );
    };


    return {
      saveAs: _saveAs,
    };
  }());

  /**
   * App starts here
   */
  var ROUTES = [
    'create',
    'preview',
  ];

  function _init() {
    window.onhashchange = _showPage;
    window.onbeforeunload = function warnOnLeave(event) {
      var formChanged = statementForm.state.get('changed');

      if (formChanged) {
        return window.confirm();
      }
    }

    _setPage();
    _addLine();
    _enableStatementActions();

    // Set button-backtotop href
    Array.prototype.forEach.call(document.querySelectorAll('a[href="#top"]'), function setTopHref(el) {
      el.addEventListener('click', function handleBackToTopClick(event) {
        el.setAttribute('href', '#' + _getCurrentPage() + '-top');
      });
    });
  }

  function _enableStatementActions() {
    var actionButtonGroups = document.querySelectorAll('.statement-actions');

    Array.prototype.forEach.call(actionButtonGroups, function addClickListener(buttonGroup) {
      buttonGroup.addEventListener('click', function handleButtonGroupClick(event) {
        var target = event.target;
        var action = target.dataset.action;

        if (target.nodeName === "BUTTON" && action) {
          switch (action) {
            case 'load_from_html':
              _loadForm('html');
              break;

            case 'load_from_url':
              _loadForm('url');
              break;

            case 'preview_save_as_html':
              _savePreviewAs('html');
              break;

            case 'preview_save_as_json':
              _savePreviewAs('json');
              break;

            default:
              break;
          }
          event.stopPropagation();
        }
      });
    });
  }

  /**
   * Return current active page
   * @return      {string} Current page hash
   */
  function _getCurrentPage() {
    return Array.prototype.filter.call(ROUTES, function (route) {
      var hash = window.location.hash;

      return hash.indexOf(route) !== -1;
    })[0];
  }

  // Set initial app route hash
  function _setPage() {
    if (ROUTES.indexOf(location.hash.substring(1)) < 0) {
      window.location.hash = 'create';
    } else {
      _showPage();
    }
  }

  function _showPage() {
    var pages = document.querySelectorAll('#accstatement .page');
    var currentPage = _getCurrentPage();
    var backToTop = document.querySelectorAll('a.button-backtotop');

    // Set back to top anchor href
    Array.prototype.forEach.call(backToTop, function setHref(el) {
      el.setAttribute('href', '#' + _getCurrentPage() + '-top');
    })

    if (currentPage === 'preview') {
      _showPreview();
    }

    // hide all pages
	/*Array.prototype.forEach.call(pages, function hide(page) {
      page.setAttribute('hidden', '');
    });*/


    // show current page
    document.querySelector('#accstatement .page.' + currentPage).removeAttribute('hidden');

    window.scrollTo(0, 0);
  }

  function _showPreview() {
    var statementPreview = document.querySelector('#accstatement .page.preview');

    // Apply conditionals
    _applyConditionals();

    // Print formdata into printables: [data-print]
    _printFormInput();

    Array.prototype.forEach.call(document.querySelectorAll("span.target-type"), function updateTarget(el) {
      if (document.getElementById('entity-target').value === "website") {
        if ((el.getAttribute('class') !== null && el.getAttribute('class').indexOf('capFL') !== -1) || (el.parentNode.getAttribute('class') !== null && el.parentNode.getAttribute('class').indexOf('capFL') !== -1)) {
          el.innerHTML = "The Website";
        } else {
          el.innerHTML = "the Website";
        }
      } else if (document.getElementById('entity-target').value === "app") {
        if ((el.getAttribute('class') !== null && el.getAttribute('class').indexOf('capFL') === -1) || (el.parentNode.getAttribute('class') !== null && el.parentNode.getAttribute('class').indexOf('capFL') === -1)) {
          el.innerHTML = "The mobile application";
        } else {
          el.innerHTML = "the mobile application";
        }
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll("span.target-name"), function updateTargetName(el) {
      if (document.getElementById('entity-target').value === "website") {
        el.innerHTML = document.getElementById('entity-target-name').value;
      } else if (document.getElementById('entity-target').value === "app") {
        el.innerHTML = document.getElementById('entity-target-app-name').value;
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll("a.siteurl"), function updateSiteURL(el) {
      if (document.getElementById('entity-target').value === "website") {
        el.setAttribute('href', document.getElementById('entity-target-url').value);
      } else {
        el.removeAttribute('href');
      }
    });

    // Custom statement print: limitations & alternatives
    (function () {
      var limitations = document.querySelectorAll('#accstmnt_issues fieldset:not(.proto)');
      var block = statementPreview.querySelector('#statement-limitations-block');
      var list = statementPreview.querySelector('#statement-limitations');
      var html = '';

      Array.prototype.forEach.call(limitations, function print(limitation) {
        var element = limitation.querySelector('input[name=element]').value;
        var description = limitation.querySelector('input[name=description]').value;
        var reason = limitation.querySelector('input[name=reason]').value;
        var us = limitation.querySelector('input[name=us]').value;
        var you = limitation.querySelector('input[name=you]').value;

        if (element || description || reason || us || you) {
          html += '\t<li>'
            + '<strong>' + element + '</strong>: '
            + description + ' because '
            + reason + '. ' + us + '. ' + you
            + '.</li>\n';
        }
      });

      if (html) {
        list.innerHTML = '\n' + html;
        block.removeAttribute('hidden');
      } else {
        block.setAttribute('hidden', '');
      }
    }());

  };

  function _savePreviewAs(filetype) {
    var saver = saver || null;

    saver.saveAs(data, filetype);
  }

  function _printFormInput() {
    var getData = statementForm.data.get;
    var printCollection = document.querySelectorAll('[data-print]');
    var printFilters = {
      lowercase: function toLowerCase(string) {
        return string.toLowerCase();
      },
      capitalize: function capitalize(string) {
        var firstChar = string.slice(0, 1).toUpperCase();
        var rest = string.slice(1);

        return firstChar + rest;
      },
      lowerfirst: function lowerFirst(string) {
        var firstChar = string.slice(0, 1).toLowerCase();
        var rest = string.slice(1);

        return firstChar + rest;
      }
    };

    function applyFilters(data, filters) {
      var newData = data;

      if (!data || !filters || filters.length === 0) {
        return data;
      }

      if (Array.isArray(data)) {
        newData = data.map(function (item) {
          return applyFilters(item, filters);
        });

      } else {
        filters.forEach(function apply(filter) {
          if (filter in printFilters) {
            newData = printFilters[filter](data);
          }
        });
      }

      return newData;
    }

    Array.prototype.forEach.call(printCollection, function printInput(item) {
      var nodeName = item.nodeName;
      var target = item.dataset.print;
      var hasFilter = item.dataset.printfilter;
      var printFilters = hasFilter && item.dataset.printfilter.split(',')
        .map(function trim(string) {
          return string.trim();
        });
      var printDefault = item.dataset.printdefault || '';
      var printData = applyFilters(getData(target), printFilters) || printDefault;
      var dataList = Array.isArray(printData);

      if (dataList && nodeName === 'UL' || nodeName === 'OL') {
        item.innerHTML = printData
          .map(function wrapInLi(data, index) {

            if (index === 0) {
              return '\n\t<li>' + data + '</li>\n';
            }

            return '\t<li>' + data + '</li>\n';
          })
          .join('');

      } else {

        switch (nodeName) {
          case 'A':
            var hrefPrefix = item.getAttribute('href');

            item.setAttribute('href', hrefPrefix + printData);
            item.innerText = printData;
            break;

          default:
            if (item.id === "accstmnt_assessment_with_tools_summary" && printData) {
              var printDataSize = printData.length;
              if ((printDataSize === 0) || ((printDataSize % 6) !== 0)) {
                outHTML = "<p>All fields related to automatic evaluation must be completed.</p>";
              } else {
                var counter = 0;
                var outHTML = "<ol>";
                while (counter < printDataSize) {
                  outHTML += "<li>";
                  if ((isDateSupported && !isNaN(Date.parse(printData[counter]))) ||
                    (!isDateSupported && typeof printData[counter] === "string")) {
                    outHTML += "(" + printData[counter] + ").";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    var s_title = printData[counter];
                    counter++;
                    var s_url = printData[counter];
                    outHTML += " Report: <a href='" + s_url + "'>" + s_title + "</a>";
                    counter++;
                  }
                  outHTML += "<ul><li>";
                  if (typeof printData[counter] === "string") {
                    outHTML += "Tool used: " + printData[counter] + "</li>";
                    counter++;
                  }
                  if (!isNaN(printData[counter])) {
                    outHTML += "<li>Sample: " + printData[counter] + " pages.</li>";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    outHTML += "<li>Main results (summary): " + printData[counter] + "</li></ul>";
                    counter++;
                  }
                  outHTML += "</li>";
                }
                outHTML += "</ol>";
              }
              item.innerHTML = outHTML;
            }
            else if (item.id === "accstmnt_assessment_with_manual_summary" && printData) {
              var printDataSize = printData.length;
              if ((printDataSize === 0) || ((printDataSize % 6) !== 0)) {
                outHTML = "<p>All fields related to manual evaluation must be completed.</p>";
              }
              else {
                var counter = 0;
                var outHTML = "<ol>";
                while (counter < printDataSize) {
                  outHTML += "<li>";
                  if ((isDateSupported && !isNaN(Date.parse(printData[counter]))) ||
                    (!isDateSupported && typeof printData[counter] === "string")) {
                    outHTML += "(" + printData[counter] + ").";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    var s_title = printData[counter];
                    counter++;
                    var s_url = printData[counter];
                    outHTML += " Report: <a href='" + s_url + "'>" + s_title + "</a>";
                    counter++;
                  }
                  if (!isNaN(printData[counter])) {
                    outHTML += "<ul><li>" + "Sample: " + printData[counter] + " pages.</li>";
                    counter++;
                  }
                  if (!isNaN(printData[counter])) {
                    outHTML += "<li>Main results (heuristics met/total applied heuristics): ";
                    outHTML += printData[counter] + "/";
                    counter++;
                  }
                  if (!isNaN(printData[counter])) {
                    outHTML += printData[counter] + "</li></ul>";
                    counter++;
                  }
                  outHTML += "</li>";
                }
                outHTML += "</ol>";
              }
              item.innerHTML = outHTML;
            }
            else if (item.id === "accstmnt_assessment_with_users_summary" && printData) {
              var printDataSize = printData.length;
              if ((printDataSize === 0) || ((printDataSize % 6) !== 0)) {
                outHTML = "<p>All fields related to user evaluation must be completed.</p>";
              }
              else {
                var counter = 0;
                var outHTML = "<ol>";
                while (counter < printDataSize) {
                  outHTML += "<li>";
                  if ((isDateSupported && !isNaN(Date.parse(printData[counter]))) ||
                    (!isDateSupported && typeof printData[counter] === "string")) {
                    outHTML += "(" + printData[counter] + ").";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    var s_title = printData[counter];
                    counter++;
                    var s_url = printData[counter];
                    outHTML += " Report: <a href='" + s_url + "'>" + s_title + "</a>";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    outHTML += "<ul><li>Characterization of participants: " + printData[counter] + "</li>";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    outHTML += "<li>" + "Tasks/Processes: " + printData[counter] + "</li>";
                    counter++;
                  }
                  if (typeof printData[counter] === "string") {
                    outHTML += "<li>" + "Main results (summary): " + printData[counter] + "</li></ul>";
                    counter++;
                  }
                  outHTML += "</li>";
                }
                outHTML += "</ol>";
              }
              item.innerHTML = outHTML;
            }
            else if (item.id === "accstmnt_orginfo_contacts_summary" && printData) {
              var printDataSize = printData.length;
              var counter = 0;
              var outHTML = "<dl>";
              while (counter < printDataSize) {
                outHTML += "<dt>";
                if (typeof printData[counter] === "string") {
                  outHTML += printData[counter];
                  counter++;
                }
                outHTML += "</dt>";
                outHTML += "<dd>";
                if (typeof printData[counter] === "string") {
                  outHTML += printData[counter];
                  counter++;
                }
                outHTML += "</dd>";
              }
              outHTML += "</dl>";
              item.innerHTML = outHTML;
            }
            else if (item.id === "accstmnt_seal_summary" && printData) {
              var outHTML = "";
              if (printData === "no") {
                outHTML = "";
              }
              if (printData !== "no") {
                outHTML = "<p>";
                if (document.getElementById('entity-target').value === "website") {
                  outHTML += "The Website ";
                  outHTML += document.getElementById('entity-target-name').value;
                } else if (document.getElementById('entity-target').value === "app") {
                  outHTML += "The mobile application ";
                  outHTML += document.getElementById('entity-target-app-name').value;
                }
                outHTML += " d";
                outHTML += document.getElementById('entity-gender').value.toLowerCase();
                outHTML += ' ' + document.getElementById('entity-name').value;
                outHTML += ' is certified with the seal ';
                outHTML += '<span class="mr mr-seal">';
                outHTML += document.querySelector('input[name="entity-seal"]:checked').value;
                outHTML += '</span>';
                outHTML += ' of usability and accessibility.';
                outHTML += ' The publishing of the seal ';
                outHTML += document.querySelector('input[name="entity-seal"]:checked').value;
                outHTML += ' it means that ';
                if (document.getElementById('entity-target').value === "website") {
                  outHTML += "the website ";
                  outHTML += document.getElementById('entity-target-name').value;
                } else if (document.getElementById('entity-target').value === "app") {
                  outHTML += "the mobile application ";
                  outHTML += document.getElementById('entity-target-app-name').value;
                }
                outHTML += ":";
                outHTML += "</p>"
                outHTML += "<ul>";
                outHTML += '<li>passes the “Contents” checklist</li>';
                outHTML += "<li>passes the accessibility testing batteries, from an automatic validation tool commonly used in the market, for ‘AA’ compliance</li>";
              }
              if (printData === "Prata" || printData === "Ouro") {
                outHTML += '<li>passes the “Transaction” checklist</li>';
                outHTML += '<li>passes the “10 functional aspects" checklist</li>';
              }
              if (printData === "Ouro") {
                outHTML += '<li>was subjected to usability tests with real users, namely with disabled users</li>';
                outHTML += "</ul>";
              }

              item.innerHTML = outHTML;
            }
            else if (item.id === "accstmnt_seal_summary_empty" && printData) {
              if (printData === 'no') {
                item.removeAttribute('hidden');
              } else {
                item.setAttribute('hidden', '');
              }
            }
            else {
              // update here is there is a need to present date in a different format using printDefault == "DATE" as a condition
              item.innerText = printData;
            }
        }
      }
    })

  }

  function _savePreviewAs(filetype) {

    if (filetype) {
      switch (filetype) {
        case 'html':
          // Prepare statement data
          var generatedStatementMarkup = _getGeneratedStatement();
          var finalStatementMarkup = _prepareStatement(generatedStatementMarkup);
          // Then use save function with data
          saver.saveAs(finalStatementMarkup, filetype);
          break;
        default:

      }
    }
  }

  function _prepareStatement(statementMarkup) {
    return statementMarkup.replace(/article/g, 'div');
  }

  function _getGeneratedStatement() {
    var generatedStatement = document.getElementById('statement_generated').cloneNode(true);
    var hiddenElements = generatedStatement.querySelectorAll('[hidden]');

    // Remove all hidden nodes
    Array.prototype.forEach.call(hiddenElements, function remove(hidden) {
      hidden.parentNode.removeChild(hidden);
    });

    function getDivChildNodes(node) {
      return Array.prototype.filter.call(node.children, function (child) {
        return child.nodeName === 'DIV';
      });
    }

    function expandDivChildren(divNode) {
      var fragment = document.createDocumentFragment();
      var divChildren = getDivChildNodes(divNode);

      if (divChildren.length > 0) {
        Array.prototype.forEach.call(divChildren, function removeDiv(divChild) {
          expandDivChildren(divChild);
        });

        // Run again on node after children
        expandDivChildren(divNode);

      } else {
        Array.prototype.forEach.call(divNode.children, function appendToFragment(divChild) {
          var element = document.createElement(divChild.nodeName);
          element.innerHTML = divChild.innerHTML;
          if (divChild.classList.length > 0) {
            element.classList = divChild.classList;
          }
          if ((divChild.nodeName === "H2") && (typeof divChild.id != 'undefined')) {
            element.id = divChild.id;
          }
          fragment.appendChild(element);
        });

        // Move div children before div and remove div
        divNode.parentNode.insertBefore(fragment, divNode);
        divNode.parentNode.removeChild(divNode);
      }

    }

    // Replace div with div.children
    Array.prototype.forEach.call(getDivChildNodes(generatedStatement), function removeDiv(child) {
      expandDivChildren(child);
    });

    return Array.prototype.map.call(generatedStatement.children, function getCleanHTML(child) {

      return child.outerHTML
        .replace(/( data-if=")[^\"]*\"/g, '')
        .replace(/( data-print=")[^\"]*\"/g, '')
        .replace(/( data-printdefault=")[^\"]*\"/g, '')
        .replace(/ {4,}/g, '\t')
        .replace(/ {2,}/g, '');
    }).join('\n')
      .replace(/\t(<\/)/g, '</')
      .replace(/\t\n/g, '');
  }

  function _loadForm(source) {
    switch (source) {
      case 'html':
        _loadFormHTML();
        break;
      case 'url':
        _loadFormURL();
        break;
      default:
        break;
    }


  }

  function _loadFormHTML() {
    if (window.File && window.FileReader && window.Blob) {
      // Great success! All the File APIs are supported.
      var inputField = document.getElementById('fileLoadInput');



      inputField.addEventListener('change', function (evt) {
        var file = evt.target.files[0];
        if (file && file.type.match('text/html')) {
          var reader = new FileReader();
          reader.onload = function (e) {
            var fileContent = e.target.result;
            var domparser = new DOMParser();
            var doc = domparser.parseFromString(fileContent, 'text/html');
            _parseDoc(doc);
            $('#tab-menu li:nth-child(2) a')[0].click();

          }
          reader.readAsText(file);
        } else {
          console.log("You must upload an html file");
        }
      })

      inputField.click();
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  }

  function _loadFormURL() {
    // get the url
    var url = window.prompt("Enter the URL of the statement to read.", "http");
    if (url === undefined || url === '')
      return;

    // get doc from url and parse doc
    var serviceUrl = fetchServer + url;
    var request = new XMLHttpRequest();
    request.open("GET", serviceUrl);
    request.onreadystatechange = function () {
	 
      if (request.readyState === 4 && request.status === 200) {
        var type = request.getResponseHeader('Content-Type');
        if (type.includes('text/html')) {
          var domparser = new DOMParser();
          var doc = domparser.parseFromString(request.responseText, 'text/html');
          _parseDoc(doc);
        }
        $('#tab-menu li:nth-child(2) a')[0].click();

      }
    }
    request.send();
  }

  function _parseDoc(savedDoc) {
    var event = new Event('change', { bubbles: true });

    _parseInputElem(savedDoc, 'mr-e-intro', 'entity-gender');

    _parseInputElem(savedDoc, 'mr-e-name', 'entity-name');

    var targetElem = savedDoc.getElementsByClassName('mr-t-type')[0];
    if (targetElem) {
      var target = targetElem.firstElementChild.textContent;
      var sEntityTarget = document.getElementById('entity-target');
      if (target === "o sítio Web") {
        sEntityTarget.value = "website";
      } else if (target === "a aplicação móvel") {
        sEntityTarget.value = "app";
      }
      sEntityTarget.dispatchEvent(event);
      if (target === "o sítio Web") {
        _parseInputElem(savedDoc, 'mr-t-desc', 'entity-target-name');
        _parseAnchorElem(savedDoc, 'siteurl', 'entity-target-url');
      } else if (target === "a aplicação móvel") {
        _parseInputElem(savedDoc, 'mr-t-desc', 'entity-target-app-name');
      }
    }

    var conformanceElem = savedDoc.getElementsByClassName('mr-conformance-status')[0];
    if (conformanceElem) {
      var conformance = conformanceElem.firstElementChild.textContent;
      var sConformance = document.getElementById('conformance-status');
      if (conformance === "plenamente conforme") {
        sConformance.value = "full";
      } else if (conformance === "parcialmente conforme") {
        sConformance.value = "partial";
      } else if (conformance === "não conforme") {
        sConformance.value = "non";
      }
      sConformance.dispatchEvent(event);
      if (conformance !== "plenamente conforme") {
        _parseList(savedDoc, 'mr-nonconf-sections', 'accstmnt_non_conformance_sections_');
        _parseList(savedDoc, 'mr-nonconf-reasons', 'accstmnt_non_conformance_reasons_');
        _parseList(savedDoc, 'mr-nonconf-alternatives', 'accstmnt_non_conformance_alternatives_');
      }
    }

    _parseInputElem(savedDoc, 'mr-date', 'accstmt_date');

    _parseAutomaticList(savedDoc, 'mr-automatic-summary', 'accstmnt_assessment_with_tools_');
    _parseList(savedDoc, 'mr-no-automatic-reasons', 'accstmnt_assessment_without_tools_');

    _parseManualList(savedDoc, 'mr-manual-summary', 'accstmnt_assessment_with_manual_');
    _parseList(savedDoc, 'mr-no-manual-reasons', 'accstmnt_assessment_without_manual_');

    _parseUsersList(savedDoc, 'mr-users-summary', 'accstmnt_assessment_with_users_');

    _parseDList(savedDoc, 'mr-contacts', 'accstmnt_orginfo_');

    _parseRadio(savedDoc, 'mr-seal', 'entity-seal-');
    _parseInputElem(savedDoc, 'mr-seal-other', 'accstmnt_assessment_additional_evidence_data');
  }

  function _parseInputElem(savedDoc, mrName, formName) {
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var elem = mrElem.firstElementChild.textContent;
      var fElem = document.getElementById(formName);
      fElem.value = elem;
      var event = new Event('change', { bubbles: true });
      fElem.dispatchEvent(event);
    }
  }

  function _parseAnchorElem(savedDoc, mrName, formName) {
    var className = "a." + mrName;
    var mrElem = savedDoc.querySelector(className);
    if (mrElem) {
      var elem = mrElem.getAttribute('href');
      var fElem = document.getElementById(formName);
      fElem.value = elem;
      var event = new Event('change', { bubbles: true });
      fElem.dispatchEvent(event);
    }
  }

  function _parseList(savedDoc, mrName, formName) {
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var list = mrElem.querySelectorAll('li');
      for (var i = 0; i < list.length; i++) {
        if (i > 0) {
          var button = document.getElementById(formName + 'button');
          button.click();
        }
        var elemNum = i + 1;
        var elemId = formName + elemNum;
        var fElem = document.getElementById(elemId);
        fElem.value = list[i].textContent;
        var event = new Event('change', { bubbles: true });
        fElem.dispatchEvent(event);
      }
    }
  }

  function _parseDList(savedDoc, mrName, formName) {
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var dtlist = mrElem.querySelectorAll('dt');
      var ddlist = mrElem.querySelectorAll('dd');
      for (var i = 0; i < dtlist.length; i++) {
        if (i > 0) {
          var button = document.getElementById(formName + 'button');
          button.click();
        }
        var elemNum = i + 1;
        var elemId = formName + "contacts_" + elemNum;
        var fElem = document.getElementById(elemId);
        fElem.value = dtlist[i].textContent;
        var event = new Event('change', { bubbles: true });
        fElem.dispatchEvent(event);
        var elemId = formName + "element_" + elemNum;
        var fElem = document.getElementById(elemId);
        fElem.value = ddlist[i].textContent;
        var event = new Event('change', { bubbles: true });
        fElem.dispatchEvent(event);
      }
    }
  }

  function _parseRadio(savedDoc, mrName, formName) {
    var radioElem = savedDoc.getElementsByClassName(mrName)[0];
    if (radioElem) {
      var radioValue = radioElem.textContent;
      var rName = formName + radioValue.toLowerCase();
      var rElem = document.getElementById(rName);
      rElem.click();
      var event = new Event('change', { bubbles: true });
      rElem.dispatchEvent(event);
    }
  }

  function _parseAutomaticList(savedDoc, mrName, formName) {
    var event = new Event('change', { bubbles: true });
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var select = document.getElementById('accstmnt_tools');
      select.value = 'yes';
      select.dispatchEvent(event);
      var list = mrElem.firstElementChild.childNodes;
      var firstNode = true;
      var elemNum = 1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].nodeType === 1) { // it's an element node, not a text node
          if (!firstNode) {
            var button = document.getElementById(formName + 'button');
            button.click();
          }
          var nodeIndex = 0;
          var content;
          // get date of the report
          content = list[i].childNodes[nodeIndex].textContent; // text node with date
          nodeIndex++;
          var openP = content.indexOf('(');
          content = content.substring(openP + 1);
          var closeP = content.indexOf(')');
          var date = content.substring(0, closeP);
          var elemId = formName + "data_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = date;
          fElem.dispatchEvent(event);
          // get title and url of the report
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          content = list[i].childNodes[nodeIndex]; // a node with url
          nodeIndex++;
          var title = content.textContent || content.innerText;
          var elemId = formName + "title_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = title;
          fElem.dispatchEvent(event);
          var url = content.getAttribute('href');
          var elemId = formName + "address_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = url;
          fElem.dispatchEvent(event);
          // get tool
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          var nodeIndex2 = 0;
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with tool
          nodeIndex2++;
          var colon = content.indexOf(':');
          var tool = content.substring(colon + 2);
          var elemId = formName + "tool_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = tool;
          fElem.dispatchEvent(event);
          // get page number
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with pages
          nodeIndex2++;
          var colon = content.indexOf(':');
          content = content.substring(colon + 2);
          var space = content.indexOf(' ');
          var pages = content.substring(0, space);
          var elemId = formName + "pages_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = pages;
          fElem.dispatchEvent(event);
          // get summary
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with summary
          var colon = content.indexOf(':');
          var report = content.substring(colon + 2);
          var elemId = formName + "report_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = report.trim().replace(/ {1,}/g, " ");
          fElem.dispatchEvent(event);
          // move to next element
          firstNode = false;
          elemNum++;
        }
      }
    } else {
      var select = document.getElementById('accstmnt_tools');
      select.value = 'no';
      select.dispatchEvent(event);
    }
  }

  function _parseManualList(savedDoc, mrName, formName) {
    var event = new Event('change', { bubbles: true });
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var select = document.getElementById('accstmnt_manual');
      select.value = 'yes';
      select.dispatchEvent(event);
      var list = mrElem.firstElementChild.childNodes;
      var firstNode = true;
      var elemNum = 1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].nodeType === 1) { // it's an element node, not a text node
          if (!firstNode) {
            var button = document.getElementById(formName + 'button');
            button.click();
          }
          var nodeIndex = 0;
          var content;
          // get date of the report
          var content = list[i].childNodes[nodeIndex].textContent; // text node with date
          nodeIndex++;
          var openP = content.indexOf('(');
          content = content.substring(openP + 1);
          var closeP = content.indexOf(')');
          var date = content.substring(0, closeP);
          var elemId = formName + "data_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = date;
          fElem.dispatchEvent(event);
          // get title and url of the report
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          content = list[i].childNodes[nodeIndex]; // a node with url
          nodeIndex++;
          var title = content.textContent || content.innerText;
          var elemId = formName + "title_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = title;
          fElem.dispatchEvent(event);
          var url = content.getAttribute('href');
          var elemId = formName + "address_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = url;
          fElem.dispatchEvent(event);
          // get page number
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          var nodeIndex2 = 0;
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with pages
          nodeIndex2++;
          var colon = content.indexOf(':');
          content = content.substring(colon + 2);
          var space = content.indexOf(' ');
          var sample = content.substring(0, space);
          var elemId = formName + "sample_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = sample;
          fElem.dispatchEvent(event);
          // get satisfied heuristics
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with heuristics
          var colon = content.indexOf(':');
          content = content.substring(colon + 2);
          var slash = content.indexOf('/');
          var satisfied = content.substring(0, slash);
          var elemId = formName + "satisfied_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = satisfied;
          fElem.dispatchEvent(event);
          // get total heuristics
          var total = content.substring(slash + 1);
          var elemId = formName + "heuristics_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = Number(total);
          fElem.dispatchEvent(event);
          // move to next element
          firstNode = false;
          elemNum++;
        }
      }
    } else {
      var select = document.getElementById('accstmnt_manual');
      select.value = 'no';
      select.dispatchEvent(event);
    }
  }

  function _parseUsersList(savedDoc, mrName, formName) {
    var event = new Event('change', { bubbles: true });
    var mrElem = savedDoc.getElementsByClassName(mrName)[0];
    if (mrElem) {
      var select = document.getElementById('accstmnt_users');
      select.value = 'yes';
      select.dispatchEvent(event);
      var list = mrElem.firstElementChild.childNodes;
      var firstNode = true;
      var elemNum = 1;
      for (var i = 0; i < list.length; i++) {
        if (list[i].nodeType === 1) { // it's an element node, not a text node
          if (!firstNode) {
            var button = document.getElementById(formName + 'button');
            button.click();
          }
          var nodeIndex = 0;
          var content;
          // get date of the report
          var content = list[i].childNodes[nodeIndex].textContent; // text node with date
          nodeIndex++;
          var openP = content.indexOf('(');
          content = content.substring(openP + 1);
          var closeP = content.indexOf(')');
          var date = content.substring(0, closeP);
          var elemId = formName + "data_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = date;
          fElem.dispatchEvent(event);
          // get title and url of the report
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          content = list[i].childNodes[nodeIndex]; // a node with url
          nodeIndex++;
          var title = content.textContent || content.innerText;
          var elemId = formName + "title_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = title;
          fElem.dispatchEvent(event);
          var url = content.getAttribute('href');
          var elemId = formName + "url_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = url;
          fElem.dispatchEvent(event);
          // get participants characterization
          while (list[i].childNodes[nodeIndex] && list[i].childNodes[nodeIndex].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex++;
          }
          var nodeIndex2 = 0;
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with sample
          nodeIndex2++;
          var colon = content.indexOf(':');
          var sample = content.substring(colon + 2);
          var elemId = formName + "participants_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = sample;
          fElem.dispatchEvent(event);
          // get tasks
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with tasks
          nodeIndex2++;
          var colon = content.indexOf(':');
          var tasks = content.substring(colon + 2);
          var elemId = formName + "tasks_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = tasks.replace(/ {1,}/g, " ");
          fElem.dispatchEvent(event);
          // get summary
          while (list[i].childNodes[nodeIndex].childNodes[nodeIndex2] && list[i].childNodes[nodeIndex].childNodes[nodeIndex2].nodeType !== Node.ELEMENT_NODE) {
            nodeIndex2++;
          }
          content = list[i].childNodes[nodeIndex].childNodes[nodeIndex2].textContent; // text node with summary
          var colon = content.indexOf(':');
          var results = content.substring(colon + 2);
          var elemId = formName + "results_" + elemNum;
          var fElem = document.getElementById(elemId);
          fElem.value = results.trim().replace(/ {1,}/g, " ");
          fElem.dispatchEvent(event);
          // move to next element
          firstNode = false;
          elemNum++;
        }
      }
    } else {
      var select = document.getElementById('accstmnt_users');
      select.value = 'no';
      select.dispatchEvent(event);
    }
  }

  function _addLine() {
    var buttons = document.querySelectorAll('#accstatement button.add-line');

    Array.prototype.forEach.call(buttons, function addClickListener(button) {
      button.addEventListener('click', function (event) {
        var parent = event.target.parentNode;
        var lines = parent.querySelectorAll('.line');
        var proto = parent.querySelector('.proto');
        var newLine = proto.cloneNode(true);

        newLine.classList.remove('proto');
        newLine.classList.add('line');
        newLine.innerHTML = newLine.innerHTML.replace(/\[n\]/g, lines.length + 1);

        // Support for remove button
        var remove = newLine.querySelector('.remove-line');
        if (remove) {
          remove.addEventListener('click', function (event) {
            var divParent = event.target.parentNode;
            var input = divParent.querySelector('input');
            var index = input.id.toString().lastIndexOf("_");
            var lineNumber = Number(input.id.substring(index + 1));
            var topParent = divParent.parentNode;
            topParent.removeChild(divParent);
            var lines = topParent.querySelectorAll('.line');
            var newFocusLine = null;
            var foundLarger = false;
            Array.prototype.forEach.call(lines, function apply(line) {
              var inputL = line.querySelector('input');
              var index = inputL.id.toString().lastIndexOf("_");
              var number = Number(inputL.id.substring(index + 1));
              if (number > lineNumber) {
                if (!foundLarger) {
                  foundLarger = true;
                  newFocusLine = inputL;
                }
                var _regex1 = new RegExp(number, 'g');
                var _regex2 = new RegExp("_" + number, 'g');
                var labelChange = line.querySelector('label');
                labelChange.innerHTML = labelChange.innerHTML.replace(_regex1, number - 1);
                for (var i = 0, atts = labelChange.attributes, n = atts.length; i < n; i++) {
                  labelChange.attributes[i].nodeValue = labelChange.attributes[i].nodeValue.replace(_regex2, "_" + (number - 1));
                }
                var inputChange = line.querySelector('input');
                inputChange.innerHTML = inputChange.innerHTML.replace(_regex1, number - 1);
                for (var i = 0, atts = inputChange.attributes, n = atts.length; i < n; i++) {
                  inputChange.attributes[i].nodeValue = inputChange.attributes[i].nodeValue.replace(_regex2, "_" + (number - 1));
                }
              }
              if (!foundLarger) {
                newFocusLine = inputL;
              }
            })
            statementForm.setFormData(newFocusLine);
          })
        }

        proto.parentNode.insertBefore(newLine, proto);

        newLine.querySelector('input, textarea').focus();
      });
    });
  }

  function _applyConditionals() {
    var getData = statementForm.data.get;
    var conditionals = document.querySelectorAll('[data-if]');

    Array.prototype.forEach.call(conditionals, function apply(conditional) {
      var negate = 'negate' in conditional.dataset;

      // Get required data for condition
      var dataList = conditional.dataset.if.split(',')
        .map(function trimString(string) {
          return string.trim();
        });

      // Get filtered datalist with values
      var dataListValues = dataList.filter(function withValue(key) {
        var data = getData(key);

        return (
          data !== undefined
          && data.length > 0
        );
      });
      var conditionMet = dataListValues.length > 0;

      if (negate) {
        conditionMet = !conditionMet;
      }

      if (conditionMet) {
        conditional.removeAttribute('hidden');
      } else {
        conditional.setAttribute('hidden', '');
      }
    });
  }

  _init();
}());