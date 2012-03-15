function phrases(langcode){
  this.panel        = new Object();
  this.add          = new Object();
  this.edit         = new Object();
  this.edit.select    = new Object();
  this.edit.edit      = new Object();
  this.set          = new Object();
  this.set.adjustment = new Object();
  this.set.beautification = new Object();

  this.panel.head     = "Own Smilies";
  this.panel.add      = "Add own smilie";
  this.panel.edit     = "Edit own smilies";
  this.panel.config   = "Settings";

  this.add.head       = "Add own smilie";
  this.add.text       = "Insert a new smilie into your smileybox.<br>Later, you can edit or delete it from there by clicking the \"Edit own smilies\"-Link in your control-panel.";
  this.add.required   = "Required information";
  this.add.optional   = "Optional information";
  this.add.url        = new Array("The smilie's URL", "Smilie URL");
  this.add.title      = new Array("Appears if you stop the mouse over the image for a moment", "Title");
  this.add.alt        = new Array("Appears if the image cannot be loaded or still hast to be loaded", "Alternative text");
  this.add.shortcut   = new Array("Gets transformend into the img-tag by sending the post. Warning: Shoult not be a systemcode.", "Shortcut");
  this.add.success    = "Smilie successfully added.";
  this.add.failture   = "Smilie could not be added. You have to fill all form fields.";
  this.add.save       = "Save";

  this.edit.head      = "Edit own smilies";
  this.edit.text      = "Choose smilie";
  this.edit.nosmileys = "There are no smilies to edit.";
  this.edit.noprocess = "What should I do with the smilie?";
  this.edit.required  = "Required information";
  this.edit.optional  = "Optional information";
  this.edit.url       = new Array("The smilie's URL", "Smilie URL");
  this.edit.title     = new Array("Appears if you stop the mouse over the image for a moment", "Title");
  this.edit.alt       = new Array("Appears if the image cannot be loaded or still hast to be loaded", "Alternative text");
  this.edit.shortcut   = new Array("Gets transformend into the img-tag by sending the post. Warning: Shoult not be a systemcode.", "Shortcut");
  this.edit.remove    = "Smilie successfully deleted";
  this.edit.select.edit = "Edit selected smilie";
  this.edit.select.remove = "Remove selected smilie";
  this.edit.select.button = "Submit";
  this.edit.edit.success  = "Smilie successfully edited";
  this.edit.edit.failture = "Smilie could not be edited. You have to fill all form fields.";
  this.edit.noshortcut = "<i>No shortcut defined</i>";
  this.edit.save      = "Save changes";

  this.set.head       = "Edit Settings";
  this.set.text       = "Change your settings.";
  this.set.title      = new Array("Own-smiliebox's title", "Box-title");
  this.set.lang       = new Array("Controlpanel-language", "Language");
  this.set.adjust     = new Array("Adjust Textfield-height on the Smiliebox's height", "Adjust textarea");
  this.set.adjustment.y = "Yes";
  this.set.adjustment.n = "No";
  this.set.beautify   = new Array("Beautify editor-window", "Beautification");
  this.set.beautification.y = "Yes";
  this.set.beautification.n = "No";
  this.set.save       = "Save settings";
  this.set.boxtitledefault = "Own smilies";
  this.set.success    = "Settings saved";
  this.set.failture   = "Settings count not be saved.<br> You have to fill all form fields.";

  // overwrite language
  if(langcode == "DE"){ //german
    this.panel.head     = "Eigene Smileys";
    this.panel.add      = "Eigenen Smiley hinzufügen";
    this.panel.edit     = "Eigene Smileys bearbeiten";
    this.panel.config   = "Einstellungen";

    this.add.head       = "Eigenen Smiley hinzufügen";
    this.add.text       = "Fügt einen Smiley in deine Smileybox hinzu.<br>Später kannst du ihn mit einem Klick auf den \"Eigene Smileys bearbeiten\"-Link in deinem Kontrollzentrum bearbeiten.";
    this.add.required   = "Benötigte Angabe";
    this.add.optional   = "Optionale Angabe";
    this.add.url        = new Array("Die URL des Smileys", "URL des Smileys");
    this.add.title      = new Array("Erscheint bei kurzem stoppen der Maus auf dem Smiley", "Titel");
    this.add.alt        = new Array("Erscheint, wenn das Bild noch geladen werden muss oder nicht geladen werden kann.", "Alternativer Text");
    this.add.shortcut   = new Array("Wird beim absenden des Posts automatisch in den img-Tag umgewandelt. Achtung: Sollte kein Standardsmileycode sein.", "Shortcut");
    this.add.success    = "Smiley erfolgreich hinzugefügt.";
    this.add.failture   = "Der Smiley wurde nicht hinzugefügt. Es müssen alle Formularfelder ausgefüllt werden.";
    this.add.save       = "Speichern";

    this.edit.head      = "Eigene Smileys bearbeiten";
    this.edit.text      = "Wähle einen Smiley aus.";
    this.edit.nosmileys = "Es gibt keine Smileys, die bearbeitet werden könnten.";
    this.edit.noprocess = "Was soll mit dem Smiley gemacht werden?";
    this.edit.required  = "Benötigte Angabe";
    this.edit.optional  = "Optionale Angabe";
    this.edit.url       = new Array("Die URL des Smileys", "URL des Smileys");
    this.edit.title     = new Array("Erscheint bei kurzem stoppen der Maus auf dem Smiley", "Titel");
    this.edit.alt       = new Array("Erscheint, wenn das Bild noch geladen werden muss oder nicht geladen werden kann.", "Alternativer Text");
    this.edit.shortcut   = new Array("Wird beim absenden des Posts automatisch in den img-Tag umgewandelt. Achtung: Sollte kein Standardsmileycode sein.", "Shortcut");
    this.edit.remove    = "Smiley erfolgreich gelöscht";
    this.edit.select.edit = "Ausgewählten Smiley bearbeiten";
    this.edit.select.remove = "Ausgewählten Smiley löschen";
    this.edit.select.button = "Los";
    this.edit.edit.success  = "Smiley erfolgreich bearbeitet.";
    this.edit.edit.failture = "Smiley konnte nicht bearbeitet werden. Fülle alle Pflichfelder aus.";
    this.edit.noshortcut = "<i>Kein Shortcut definiert</i>";
    this.edit.save      = "Änderungen speichern";

    this.set.head       = "Einstellungen bearbeiten";
    this.set.text       = "Hier können die Einstellungen bearbeitet werden.";
    this.set.title      = new Array("Der Titel der Eigene-Smiley-Box", "Boxtitel");
    this.set.lang       = new Array("Die Sprache im Kontrollzentrum", "Sprache");
    this.set.adjust     = new Array("Gibt an, ob das Editortextfeld automatisch auf die Höhe der Smileybox angepasst wird, falls die Boxen zusammen großer sind, als das Textfeld.", "Editortextfeld anpassen");
    this.set.adjustment.y = "Ja";
    this.set.adjustment.n = "Nein";
    this.set.beautify   = new Array("Editorfesnster verschönern", "Verschönerung");
    this.set.beautification.y = "Yes";
    this.set.beautification.n = "No";
    this.set.save       = "Einstellungen speichern.";
    this.set.boxtitledefault = "Eigene Smileys";
    this.set.success    = "Einstellung gespeichert";
    this.set.failture   = "Einstellungen konnten nicht gespeichert werden.<br>Es müssen alle Formularfelder ausgefüllt werden.";

  }
}