import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';

const ApiFlowDiagram = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="mb-8 text-center text-primary">Pet Adoption Platform - Backend API Flow</h1>
        
        {/* Frontend Layer */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-muted-foreground">Frontend Pages</h2>
          <div className="flex flex-wrap justify-center gap-4">
            <Card className="p-4 bg-green-100 border-green-300">
              <h3 className="text-center text-green-800">Home</h3>
              <p className="text-sm text-green-600 text-center mt-2">Landing page</p>
            </Card>
            <Card className="p-4 bg-green-100 border-green-300">
              <h3 className="text-center text-green-800">Browse</h3>
              <p className="text-sm text-green-600 text-center mt-2">Pet listings</p>
            </Card>
            <Card className="p-4 bg-green-100 border-green-300">
              <h3 className="text-center text-green-800">Pet Profile</h3>
              <p className="text-sm text-green-600 text-center mt-2">Pet details</p>
            </Card>
            <Card className="p-4 bg-green-100 border-green-300">
              <h3 className="text-center text-green-800">Adoption Form</h3>
              <p className="text-sm text-green-600 text-center mt-2">Apply to adopt</p>
            </Card>
            <Card className="p-4 bg-green-100 border-green-300">
              <h3 className="text-center text-green-800">Dashboard</h3>
              <p className="text-sm text-green-600 text-center mt-2">User management</p>
            </Card>
          </div>
        </div>

        {/* API Layer */}
        <div className="mb-12">
          <h2 className="mb-6 text-center text-muted-foreground">Backend APIs</h2>
          
          {/* Authentication APIs */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-primary">Authentication APIs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-blue-100 border-blue-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-blue-800">/auth/register</h4>
                <p className="text-sm text-blue-600 mt-2">Register new user</p>
                <div className="text-xs text-blue-500 mt-2">
                  Body: name, email, password, phone, address
                </div>
              </Card>
              <Card className="p-4 bg-blue-100 border-blue-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-blue-800">/auth/login</h4>
                <p className="text-sm text-blue-600 mt-2">Login user, return token</p>
                <div className="text-xs text-blue-500 mt-2">
                  Body: email, password
                </div>
              </Card>
            </div>
          </div>

          {/* Pets APIs */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-primary">Pets APIs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-purple-100 border-purple-300 min-w-[250px]">
                <Badge className="mb-2 bg-green-600">GET</Badge>
                <h4 className="text-purple-800">/pets</h4>
                <p className="text-sm text-purple-600 mt-2">List all pets with filters</p>
                <div className="text-xs text-purple-500 mt-2">
                  Query: species, breed, age, gender, location
                </div>
              </Card>
              <Card className="p-4 bg-purple-100 border-purple-300 min-w-[250px]">
                <Badge className="mb-2 bg-green-600">GET</Badge>
                <h4 className="text-purple-800">/pets/:id</h4>
                <p className="text-sm text-purple-600 mt-2">Get single pet profile</p>
                <div className="text-xs text-purple-500 mt-2">
                  Params: petId
                </div>
              </Card>
              <Card className="p-4 bg-purple-100 border-purple-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-purple-800">/pets</h4>
                <p className="text-sm text-purple-600 mt-2">Add new pet (admin/shelter)</p>
                <div className="text-xs text-purple-500 mt-2">
                  Auth: Admin required
                </div>
              </Card>
            </div>
          </div>

          {/* Adoption Applications APIs */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-primary">Adoption Applications APIs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-orange-100 border-orange-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-orange-800">/applications</h4>
                <p className="text-sm text-orange-600 mt-2">Submit adoption form</p>
                <div className="text-xs text-orange-500 mt-2">
                  Body: userId, petId, documents, description
                </div>
              </Card>
              <Card className="p-4 bg-orange-100 border-orange-300 min-w-[250px]">
                <Badge className="mb-2 bg-green-600">GET</Badge>
                <h4 className="text-orange-800">/applications/:userId</h4>
                <p className="text-sm text-orange-600 mt-2">Get user's applications</p>
                <div className="text-xs text-orange-500 mt-2">
                  Params: userId
                </div>
              </Card>
              <Card className="p-4 bg-orange-100 border-orange-300 min-w-[250px]">
                <Badge className="mb-2 bg-yellow-600">PUT</Badge>
                <h4 className="text-orange-800">/applications/:id</h4>
                <p className="text-sm text-orange-600 mt-2">Update application status</p>
                <div className="text-xs text-orange-500 mt-2">
                  Body: status (approved/rejected)
                </div>
              </Card>
            </div>
          </div>

          {/* Donations & Volunteer APIs */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-primary">Donations & Volunteer APIs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-teal-100 border-teal-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-teal-800">/donations</h4>
                <p className="text-sm text-teal-600 mt-2">Make a donation</p>
                <div className="text-xs text-teal-500 mt-2">
                  Body: userId, amount, method
                </div>
              </Card>
              <Card className="p-4 bg-teal-100 border-teal-300 min-w-[250px]">
                <Badge className="mb-2 bg-green-600">GET</Badge>
                <h4 className="text-teal-800">/donations/:userId</h4>
                <p className="text-sm text-teal-600 mt-2">Donation history</p>
                <div className="text-xs text-teal-500 mt-2">
                  Params: userId
                </div>
              </Card>
              <Card className="p-4 bg-teal-100 border-teal-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-teal-800">/volunteer</h4>
                <p className="text-sm text-teal-600 mt-2">Apply as volunteer</p>
                <div className="text-xs text-teal-500 mt-2">
                  Body: userId, skills, availability
                </div>
              </Card>
            </div>
          </div>

          {/* Messaging APIs */}
          <div className="mb-8">
            <h3 className="mb-4 text-center text-primary">Messaging APIs</h3>
            <div className="flex flex-wrap justify-center gap-4">
              <Card className="p-4 bg-pink-100 border-pink-300 min-w-[250px]">
                <Badge className="mb-2 bg-blue-600">POST</Badge>
                <h4 className="text-pink-800">/messages</h4>
                <p className="text-sm text-pink-600 mt-2">Send message</p>
                <div className="text-xs text-pink-500 mt-2">
                  Body: senderId, receiverId, text
                </div>
              </Card>
              <Card className="p-4 bg-pink-100 border-pink-300 min-w-[250px]">
                <Badge className="mb-2 bg-green-600">GET</Badge>
                <h4 className="text-pink-800">/messages/:conversationId</h4>
                <p className="text-sm text-pink-600 mt-2">Fetch chat history</p>
                <div className="text-xs text-pink-500 mt-2">
                  Params: conversationId
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Database Layer */}
        <div className="mb-8">
          <h2 className="mb-6 text-center text-muted-foreground">Database Entities</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">User</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• name</div>
                <div>• email</div>
                <div>• password</div>
                <div>• phone</div>
                <div>• address</div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">Pet</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• name</div>
                <div>• species</div>
                <div>• breed</div>
                <div>• age</div>
                <div>• gender</div>
                <div>• vaccinated</div>
                <div>• location</div>
                <div>• description</div>
                <div>• images[]</div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">Application</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• userId (Foreign Key)</div>
                <div>• petId (Foreign Key)</div>
                <div>• status</div>
                <div>• documents[]</div>
                <div>• description</div>
                <div>• createdAt</div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">Donation</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• userId (Foreign Key)</div>
                <div>• amount</div>
                <div>• method</div>
                <div>• date</div>
                <div>• status</div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">Message</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• senderId (Foreign Key)</div>
                <div>• receiverId (Foreign Key)</div>
                <div>• conversationId</div>
                <div>• text</div>
                <div>• timestamp</div>
                <div>• isRead</div>
              </div>
            </Card>

            <Card className="p-6 bg-gray-100 border-gray-300">
              <h3 className="mb-4 text-gray-800">Volunteer</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>• id (Primary Key)</div>
                <div>• userId (Foreign Key)</div>
                <div>• skills</div>
                <div>• availability</div>
                <div>• status</div>
                <div>• appliedAt</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Flow Connections */}
        <div className="mb-8">
          <h2 className="mb-6 text-center text-muted-foreground">API Flow Connections</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200">
              <h3 className="mb-4 text-blue-800">Frontend → API Connections</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Home</strong> → GET /pets (featured pets)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Browse</strong> → GET /pets (with filters)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Pet Profile</strong> → GET /pets/:id</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Adoption Form</strong> → POST /applications</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span><strong>Dashboard</strong> → GET /applications/:userId</span>
                </div>
              </div>
            </Card>

            <Card className="p-6 bg-gradient-to-r from-purple-50 to-purple-100 border-purple-200">
              <h3 className="mb-4 text-purple-800">API → Database Connections</h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>Auth APIs</strong> → User table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>Pet APIs</strong> → Pet table</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>Application APIs</strong> → Application, User, Pet tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>Donation APIs</strong> → Donation, User tables</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                  <span><strong>Message APIs</strong> → Message, User tables</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Legend */}
        <Card className="p-6 bg-gray-50 border-gray-200">
          <h3 className="mb-4 text-center">Legend</h3>
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <Badge className="bg-green-600">GET</Badge>
              <span>Read Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-600">POST</Badge>
              <span>Create Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-yellow-600">PUT</Badge>
              <span>Update Operations</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-100 border-green-300 border rounded"></div>
              <span>Frontend Pages</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-100 border-gray-300 border rounded"></div>
              <span>Database Tables</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ApiFlowDiagram;