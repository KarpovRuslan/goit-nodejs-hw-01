const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    console.table(JSON.parse(contacts));
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function getContactById(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const contact = JSON.parse(contacts).find((el) => el.id === contactId);
    console.table(contact);
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function removeContact(contactId) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);

    const findIndex = parsedContacts.findIndex((el) => el.id === contactId);
    if (findIndex === -1) {
      throw new Error(
        `!Please check entered ID. Contact with ID ${contactId} is not in the list`
      );
    }
    const newContactList = parsedContacts.filter(
      (_, index) => index !== findIndex
    );
    await fs.writeFile(contactsPath, JSON.stringify(newContactList), "utf-8");
    console.log(
      `Contact with ID: ${contactId} successfully deleted from the list`
    );
    console.table(newContactList);
  } catch (error) {
    console.log("Error", error.message);
  }
}

async function addContact(name, email, phone) {
  try {
    const contacts = await fs.readFile(contactsPath, "utf-8");
    const parsedContacts = JSON.parse(contacts);
    const id = nanoid(21);
    const newContact = { id, name, email, phone };
    parsedContacts.push(newContact);

    await fs.writeFile(contactsPath, JSON.stringify(parsedContacts), "utf-8");
    console.log(`Contact with name: ${name} successfully added to the list`);
    console.table(parsedContacts);
  } catch (error) {
    console.log("Error", error.message);
  }
}

module.exports = { listContacts, getContactById, removeContact, addContact };
