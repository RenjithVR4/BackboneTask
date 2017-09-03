# SOCI Take home technical (front end) #

This is intended to give us some idea of your abilities in the following areas:

- Code/logic structure and organization
- Fulfilling the requirements of a functional specification
- OOP practices
- DOM organization
- Layout/design and CSS
- Problem-solving

Suggested technical resources:

- backbonejs.org
- underscorejs.org
- jQuery.com


Within the time allotted, do your best to fulfill the following specification using the existing code here as a template.

Please include a document detailing your thought process while working on this, and a rough estimate of your time spent (in hours).

Do not include or make use of any additional javascript libraries.

You may use any other resources you like, and you may contact your interviewer for additional information if the specification is unclear.

**User Story**

As your interviewer, I want to see and be able to interact with all of the scheduled posts (list items) provided in the test data (located in `/bb_collections/ListItemCollection.js`)

**Functional Spec**

- General data about the list should be shown somewhere in the container:
    - Number of total list items
    - Number of "approved" posts
        - These are posts with `customer_approved` and `manager_approved` values equal to 1
    - Number of "pending" posts
        - These are posts with `customer_approved` or `manager_approved` (or both) equal to 0
    - Number of "rejected" posts
        - These are posts with `customer_approved` or `manager_approved` (or both) equal to -1
- There should be a PAGED, SORTABLE, SEARCHABLE list of scheduled posts:
    - Assume that you will always have a complete set of local data (don't worry about service calls)
    - Page limit of 5 items
    - Paging controls:
        - Next page
        - Previous page
        - Next/Previous buttons should be visible but appear disabled when not applicable (i.e., when on the first or last page)
    - Sort by:
        - `schedule` date (ascending and descending)
        - `created_at` date (ascending and descending)
        - `created_by_name` (ascending and descending)
    - Search by:
        - `message` text
        - `created_by_name`
- Scheduled Post List Items:
    - Should display at least the following information:
        - A single-line snippet of the message text
        - The date/time for which the post is scheduled
        - The network TYPE (i.e. facebook) for which the post is scheduled
        - Some kind of indication of its approval status
    - Should have the following interactions:
        - "Click" on a list item should bring up a small dialog box showing:
            - The full message text
            - The date/time for which the post is scheduled
            - The network TYPE (i.e. facebook) for which the post is scheduled
            - The network NAME
            - The network thumbnail
            - The date/time the post the date was created
            - The name of the person who created the post
            - An indication of its approval status
        - "Hover" on a list item should show a "delete" button
            - "Click" on the delete button should remove the post from both the collection and the list.